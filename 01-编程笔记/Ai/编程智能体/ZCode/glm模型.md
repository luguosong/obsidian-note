---
描述: GLM-5.3 / 5.3-Flash / 5.2 / 5.1 各配置能力总表（按实战编程排序）与 ZCode 选档建议
排序:
分组:
分类: "[[ZCode]]"
创建时间: 2026年09月13日
---
# glm模型

ZCode 内置模型以 **GLM-5.3**（旗舰，2026-08-14 发布，稳定 1M 上下文）与 **GLM-5.3-Flash**（普惠）为主，本表另收前代 **GLM-5.2**（与 5.3 同基座）和 **GLM-5.1**（2026-04 发布、首个登顶 SWE-bench Pro 的开源模型，[21财经](https://www.21jingji.com/article/20260408/herald/2ccbcf8c46b19d63169f43486c7a904d.html)）作对照。排序规则：有实战数据的 GLM-5.3 Max / High 居前，其余按代际分组。数据来自 [BenchLeader](https://www.benchleader.com/models/glm-5-3) 与 [ModelDial](https://modeldial.com/models/glm-5-3)；GLM-5.3 参加的是与 [[gpt5.6模型]] 相同的 `coding-fast-v4.12` 题包，但经自定义端点测试、非同批横测。

## 实战编程能力排名

各列的含义：

- **实战编程 MD** = ModelDial `coding-fast-v4.12` 真实编程任务得分 `/100`，==排序依据==；可与 [[gpt5.6模型]] 同列对照（非同批，仅量级参考）
- **推理指数 / 综合指数** = BenchLeader 的 Reasoning / 综合指数
- **成本** = ModelDial Reference Cost，衡量额度压力，不等价于 Token 消耗量

> [!note] GLM 的档位覆盖不全
> BenchLeader 对 GLM 各代大多只测了 Max 与 default 两档（default = 厂商未注明思考档位），ModelDial 只测了 GLM-5.3 的 Max / High，缺失处标 —。

| 配置 | 实战编程 MD | 推理指数 | 综合指数 | 成本 |
| --- | ---: | ---: | ---: | ---: |
| **5.3 Max** | **65** | 67 | — | $0.46 |
| **5.3 High** | **63** | — | — | $0.51 |
| 5.3 Default | — | — | 67 | — |
| 5.3 Flash Default | — | 68 | 58 | — |
| 5.3 Flash Max | — | 66 | — | — |
| 5.2 Max | — | 67 | — | — |
| 5.2 Default | — | 53 | 56 | — |
| 5.1 Default | — | 61 | 57 | — |

表中三个直接可见的模式：

- **实战对齐 5.6 中档**：GLM-5.3 Max / High 实测 65 / 63 分，约相当于 5.6 的 Sol Low（65）/ Luna Max（63）水平，成本 $0.46 / $0.51 也与 Sol 档相当；距 5.6 最强的 Sol XHigh（85）与 GPT-6 Astra XHigh（94.1）仍有明显差距。
- **提升在智能体、不在单轮基准**：5.3 与 5.2 共用同一基座，官方称编程能力提升 50%（内部智能体编程评测），并在 Terminal Bench 3.0、Agents' Last Exam (CLI) 拿下开源第一（[智谱文档](https://docs.bigmodel.cn/cn/guide/models/text/glm-5.3)）；但 BenchLeader 上两代 Max 档的推理/编程指数完全持平（67 / 64）——增益体现在长程智能体任务，而非单轮问答。
- **Flash 是性价比档**：5.3 Flash（320B 总参 / 18B 激活，GLM-5 系首个原生多模态）的 BenchLeader 总指数（60.1）与旗舰 5.3（60.0）持平，推理指数 68 甚至高于旗舰的 67，API 混合价却只有 $0.119/M——约为旗舰 $2.15/M 的 1/18。

## ZCode 选档建议

- 复杂多步开发、长程任务 → **GLM-5.3**（稳定 1M 上下文，旗舰）
- 日常批量任务、额度紧张 → **GLM-5.3-Flash**（指数不落下风，价格约 1/18）
- 思考档位：重任务选 **Max**——ModelDial 上 Max 比 High 略强且更快更省（65 vs 63 分、$0.46 vs $0.51）
- 新用户试用 → **GLM-5-turbo**（前 5 天每日 2M Token）

> [!tip] Flash 夜间免费时段
> 2026-09-03 至 09-20，23:00–次日 9:00 经 ZCode 使用 GLM-5.3-Flash **完全免费**；订阅用户的「闲时任务」在算力冗余窗口执行也不消耗套餐额度。([ZCode 文档](https://zcode.z.ai/cn/docs/welcome))
