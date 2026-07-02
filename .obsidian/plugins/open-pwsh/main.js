const { Plugin, Notice } = require("obsidian");
const { exec } = require("child_process");

class OpenPwshPlugin extends Plugin {
  async onload() {
    this.addRibbonIcon("terminal", "Open PowerShell 7", () => this.openPwsh());

    this.addCommand({
      id: "open-pwsh-in-vault-root",
      name: "在 vault 根目录打开 PowerShell 7",
      callback: () => this.openPwsh(),
    });
  }

  openPwsh() {
    const vaultPath = this.app.vault.adapter.getBasePath();
    // 用 cmd 的 start 在新窗口启动 pwsh。直接用 PATH 中的 pwsh，而非绝对路径——
    // pwsh 安装时即加入 PATH，升级/换盘/装 preview 都无需改这里。命令为固定常量、
    // vaultPath 经 cwd 传入，无外部输入插值 → 无注入风险；start 是 cmd 内部命令，必须
    // 经 shell（execFile/spawn 经 cmd 二次解析会吞掉空标题，已实测不可靠，故用 exec）。
    exec('start "" pwsh', {
      cwd: vaultPath,
      shell: "cmd.exe",
    }, (err) => {
      if (err) new Notice(`打开 PowerShell 7 失败: ${err.message}`);
    });
  }
}

module.exports = OpenPwshPlugin;
