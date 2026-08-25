# code/ 代码示例目录约定

`code/` 存放与笔记配套的**可运行代码示例**（Java、Node 等小项目），与 `01-编程笔记/` 构成「中文笔记 ↔ 英文代码」的配套关系。在 `code/` 下创建/修改代码，或笔记要用 `--8<--` 引用 `code/` 源文件时适用本约定。

## 1. 结构：与 `01-编程笔记/` 同构

`code/` 的目录树与 `01-编程笔记/` **逐级对应**，笔记里的每个分类目录在 `code/` 下都有同位置的英文目录。示例项目放在对应主题目录里。

## 2. 命名：全英文、kebab-case

`code/` 下的目录和项目统一使用英文：把 `01-编程笔记/` 里的中文主题目录名转成英文 + kebab-case（全小写、单词用连字符 `-` 分隔），不用空格、中文或驼峰。

| `01-编程笔记/` 主题目录（中文） | `code/`（英文 + kebab-case） |
|---|---|
| `Java` | `code/java/` |
| `前端` | `code/frontend/` |
| `Ai` | `code/ai/` |
| `计算机组成原理` | `code/computer-organization/` |

示例项目命名建议带 `-demo` 后缀，如 `code/java-demo`、`code/java/spring-ioc-demo`。

## 3. 笔记与代码的互动

- **笔记引用代码**：在 `01-编程笔记/` 的笔记里，用 `--8<--` 语法在**带语言的代码块**中引用 `code/` 下的源文件，路径相对仓库根目录，整行 `--8<-- "相对路径"` 放在代码块内部：
  ````markdown
  ```java
  --8<-- "code/java/basics/javase-demo/src/main/java/com/luguosong/overview/HelloWorld.java"
  ```
  ````
	- 代码块的语言标注（如 `java`）对应所引用文件的语言，便于语法高亮。
	- `--8<--` 写成裸露的普通文本行则无法正确引用。
- **可运行的工程代码只放 `code/`**：`01-编程笔记/` 只放 `.md` 笔记。
- **只提交源码与必要配置**：编译产物、依赖、IDE 文件已被 `.gitignore` 忽略（`node_modules/`、`target/`、`*.iml` 等），不要手动提交。

## 4. 技术栈默认偏好

- **Java 项目**：优先 **JDK 21 (LTS)**，按 21 配置（`java.version=21` / `sourceCompatibility=21` / `--release 21`），除非笔记主题明确要求其它版本。
- **前端项目（Node）**：优先 **pnpm** 作为包管理器（`pnpm install` / `pnpm dev` / `pnpm build`）；仅当环境未装 pnpm，或项目已有 `package-lock.json` / `yarn.lock` 时，才退回 npm/yarn 并说明原因。
