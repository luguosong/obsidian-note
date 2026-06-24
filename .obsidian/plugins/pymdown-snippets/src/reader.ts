import { App, TFile } from "obsidian";

export type ReadResult =
  | { ok: true; content: string }
  | { ok: false; error: string };

// 从 vault 读取被包含文件。路径相对 vault 根。
// 成功返回文件内容；任何失败返回结构化错误，绝不抛异常。
export async function readIncludedFile(
  app: App,
  path: string
): Promise<ReadResult> {
  if (!path || !path.trim()) {
    return { ok: false, error: `路径为空` };
  }

  const file = app.vault.getAbstractFileByPath(path);
  if (!file) {
    return { ok: false, error: `找不到文件：${path}` };
  }
  if (!(file instanceof TFile)) {
    return { ok: false, error: `路径不是文件（可能是文件夹）：${path}` };
  }

  try {
    const content = await app.vault.cachedRead(file);
    return { ok: true, content };
  } catch (e) {
    return { ok: false, error: `读取失败：${path}（${String(e)}）` };
  }
}
