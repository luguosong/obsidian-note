import { Plugin } from "obsidian";
import { createSnippetPostProcessor } from "./postProcessor";
import { createSnippetViewPlugin } from "./livePreview";

export default class PymdownSnippetsPlugin extends Plugin {
  async onload() {
    console.log("pymdown-snippets loaded");
    // 阅读视图（v1）
    this.registerMarkdownPostProcessor(createSnippetPostProcessor(this.app, this));
    // 实时预览（本次新增）
    this.registerEditorExtension(createSnippetViewPlugin(this.app, this));
  }

  async onunload() {
    console.log("pymdown-snippets unloaded");
  }
}
