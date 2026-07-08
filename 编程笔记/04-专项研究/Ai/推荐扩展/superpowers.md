---
排序: 2000
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[superpowers README]]"
描述: 面向编码 agent 的完整软件开发方法论 skill 库（作者 obra，经 Claude 官方插件市场分发），把需求细化、TDD、子代理协同、系统化调试、验证先行固化为可调用 skill，让 AI 掌控完整 SDLC。
分组: 工程方法论与工作流
创建时间: 2026年06月25日
---
# superpowers


## 安装

```shell
# 直接从Anthropic 的官方 marketplace（市场）安装 plugin（插件）
/plugin install superpowers@claude-plugins-official
```

## Skill介绍

基本工作流:

| skill                          | 描述                                                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| brainstorming(头脑风暴)            | 苏格拉底式设计优化<br><br>在编写代码前激活。通过问题细化粗略想法，探索替代方案，分段呈现设计以供验证。保存`设计文档`。                                                |
| using-git-worktrees            | 并行开发分支<br><br>在设计批准后激活。在新分支上创建隔离工作区，运行项目设置，验证干净的测试基线。                                                           |
| writing-plans                  | 详细的实现计划<br><br>在设计获批后激活。将工作分解为小任务（每个 2-5 分钟）。每个任务都有确切的文件路径、完整代码和验证步骤。                                           |
| subagent-driven-development    | 快速迭代与两阶段审查（规范合规性，然后代码质量）<br><br>为每个任务分配新的 subagent 进行两阶段审查（规范合规性，然后代码质量）                                        |
| executing-plans                | 带检查点的批量执行<br><br>以批处理方式执行并设置人工检查点                                                                               |
| test-driven-development        | 在实现期间激活。强制执行 RED-GREEN-REFACTOR：编写失败的测试，观察其失败，编写最小代码，观察其通过，提交。删除在测试之前编写的代码。<br>RED-GREEN-REFACTOR 循环（包括测试反模式参考） |
| requesting-code-review         | 审查前检查清单<br><br>在任务之间激活。根据计划进行审查，按严重程度报告问题。关键问题会阻止进度。                                                            |
| finishing-a-development-branch | 合并/PR 决策工作流<br><br>在任务完成时激活。验证测试，呈现选项（合并/PR/保留/丢弃），清理工作树。                                                       |

调试：

| skill                          | 描述                                                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------- |
| systematic-debugging           | 4 阶段根本原因流程（包括 root-cause-tracing（根本原因追踪）、defense-in-depth（纵深防御）、condition-based-waiting（基于条件的等待）技术） |
| verification-before-completion | 确保问题确实已修复                                                                                           |

协作：

| skill                       | 描述              |
| --------------------------- | --------------- |
| dispatching-parallel-agents | 并发 subagent 工作流 |
| receiving-code-review       | 响应反馈            |

元技能：

| skill             | 描述                             |
| ----------------- | ------------------------------ |
| writing-skills    | 按照最佳实践创建新的 Skills(技能)（包括测试方法论） |
| using-superpowers | Skills(技能)系统介绍                 |
