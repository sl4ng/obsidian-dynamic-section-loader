import {ItemView, WorkspaceLeaf} from 'obsidian'

import {LOADER_VIEW_TYPE} from './constants'

import type { LoaderSettings } from "./settings"
import type LoaderPlugin from "./main"
export class LoaderView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return LOADER_VIEW_TYPE;
  }

  getDisplayText() {
    return "";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "Example view" });
  }

  async onClose() {
    // Nothing to clean up.
  }
}