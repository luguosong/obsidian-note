---
描述:
排序:
分组:
创建时间: 2026年07月15日
---
# Chrome浏览器优化

## 防止网页崩溃优化

- 关闭图形加速功能

![[Pasted image 20260715091936.png]]

- 关闭视频硬解码

```
chrome://flags/#disable-accelerated-video-decode
设为 Disabled
```

![[Pasted image 20260715092034.png]]

- 禁用掉广告拦截

![[Pasted image 20260715091849.png]]

 - 禁用 XTU（立即、可逆、零风险）。 管理员 PowerShell：                                                                                                                 
 ```
Stop-Service XTU3SERVICE                                                                                                                                                                 
Set-Service XTU3SERVICE -StartupType Disabled 
 ```
  