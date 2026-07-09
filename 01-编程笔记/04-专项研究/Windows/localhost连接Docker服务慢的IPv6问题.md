---
分类:
  - "[[Windows]]"
关联笔记:
描述: Windows 上 JDBC/应用用 localhost 连本地 Docker 发布的端口(MySQL/Redis 等)每次卡约 21 秒，换成 127.0.0.1 秒连。根因是 localhost 优先解析到 IPv6 ::1，而 Docker Desktop 的端口代理不响应 ::1 回环。
排序:
分组:
创建时间: 2026年07月03日
---
# localhost 连接 Docker 服务慢的 IPv6 问题

## 现象

本地开发时，用 `localhost` 连本机 Docker 启动的 MySQL 非常卡（每建一条连接要等十几秒），但把 `localhost` 换成 `127.0.0.1` 就瞬间连上。

```yaml
# 慢
url: ${BASIC_DB_URL:jdbc:mysql://localhost:19002/uocs-basic?createDatabaseIfNotExist=true}
# 快
url: ${BASIC_DB_URL:jdbc:mysql://127.0.0.1:19002/uocs-basic?createDatabaseIfNotExist=true}
```

不只是 MySQL——凡是连 Docker 发布端口的组件（Redis、RabbitMQ、MinIO 等）用 `localhost` 都会中招。

## 实测数据

用 `TcpClient` 直接测三种地址连 `19002`（Docker MySQL）的 TCP 建连耗时：

| 目标 | 建连耗时 | 说明 |
|------|---------|------|
| `localhost` | **21,063 ms** | 先试 `::1` 卡住，超时后回退 IPv4 才成功 |
| `127.0.0.1` | **2.6 ms** | 直连 IPv4 |
| `::1` | 一直挂起（手动中止） | IPv6 回环连不上 |

关键旁证：

```powershell
# localhost 的解析顺序：IPv6 在前
[System.Net.Dns]::GetHostAddresses("localhost")
#  ::1
#  127.0.0.1

# Docker 端口同时绑了 IPv4 和 IPv6
docker ps --format "{{.Names}}  {{.Ports}}"
#  uocs-mysql  0.0.0.0:19002->3306/tcp, [::]:19002->3306/tcp
```

## 根因

三件事叠加：

1. **`localhost` 在 Windows 上优先解析到 `::1`（IPv6），`127.0.0.1`（IPv4）排在后面。**
2. **Docker Desktop for Windows 的端口转发代理对 `::1` 这条 IPv6 回环不响应**——虽然 `docker ps` 显示 `[::]:19002` 好像绑了 IPv6，但代理只把 IPv4 侧正常转发到容器，发往 `::1` 的 SYN 没人应答。
3. 于是 `jdbc:mysql://localhost` 每建一条连接：先连 `::1:19002` → 无响应 → 阻塞约 21 秒（SYN 重传 / 连接超时）→ 才回退到 `127.0.0.1` → 成功。这 ~21s 的白等就是"卡"。

`127.0.0.1` 跳过名称解析直连 IPv4，不触发这条 IPv6 死路，所以快。

> 为什么连宿主机上跑的普通应用（如另一个 Spring Boot 端口）用 localhost 不卡？
> 因为原生 Tomcat 默认只绑 IPv4（`0.0.0.0`），发往 `::1` 会立即收到 RST（连接拒绝），瞬间回退到 IPv4——是"快速失败"而不是 Docker 代理那种"吞掉 SYN 干等超时"。所以这个 21s 卡顿是 **Docker 端口发布特有**的。

## 解决方案（按推荐度）

### ① 连接地址直接写 127.0.0.1（最省事）

把连 Docker 组件的地址里的 `localhost` 改成 `127.0.0.1`。适合逐个配置项明确的场景。缺点：地址多时要逐个改，漏一个卡一个。

### ② JVM 参数一次性根治（连接点多时首选）

```
-Djava.net.preferIPv4Stack=true
```

加到启动参数后，该 JVM 内所有 `localhost` 一律优先走 IPv4，DB/Redis/RabbitMQ/MinIO 全覆盖，不用逐个改地址。IDEA 里加到 Run Configuration 的 VM options。

### ③ 让 Docker 只发布 IPv4

`docker-compose.yml` 里把端口映射显式绑到 IPv4 回环：

```yaml
ports:
  - "127.0.0.1:19002:3306"   # 而不是 "19002:3306"
```

这样根本不存在 IPv6 侧监听，`localhost` 走到 `::1` 会立即被拒并快速回退。

### ④ （不推荐）改系统 IPv6 前缀策略 / hosts

系统级调整 `localhost` 的解析优先级，影响面大、易踩坑，一般不用。

## 排查命令速查

```powershell
# 1. 看 localhost 解析顺序（::1 在前就是嫌疑）
[System.Net.Dns]::GetHostAddresses("localhost")

# 2. 看 Docker 端口是否绑了 IPv6
docker ps --format "{{.Names}}  {{.Ports}}"

# 3. 实测三种地址的 TCP 建连耗时
foreach ($h in @("localhost","127.0.0.1","::1")) {
  $sw=[System.Diagnostics.Stopwatch]::StartNew()
  try { $c=New-Object Net.Sockets.TcpClient; $c.Connect($h,19002); $sw.Stop()
        "{0,-12} {1,8:N1} ms  {2}" -f $h,$sw.Elapsed.TotalMilliseconds,$c.Client.RemoteEndPoint; $c.Close() }
  catch { $sw.Stop(); "{0,-12} FAIL {1,8:N1} ms  {2}" -f $h,$sw.Elapsed.TotalMilliseconds,$_.Exception.Message }
}
```

## 一句话结论

Windows 上 `localhost` 优先解析 IPv6 `::1`，而 Docker Desktop 的端口代理不通 `::1`，导致每次连接白等 ~21s 才回退。**连 Docker 服务一律用 `127.0.0.1`，或给 JVM 加 `-Djava.net.preferIPv4Stack=true`。**
