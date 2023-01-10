import {Plugin} from 'obsidian'
import {LOADER_VIEW_TYPE} from './constants'
import {DEFAULT_SETTINGS, LoaderSettings, LoaderSettingTab} from './settings'
import { LoaderView } from './view'


export default class LoaderPlugin extends Plugin {
  private settings: LoaderSettings

  async onload() {
    await this.loadSettings()

    this.addSettingTab(new LoaderSettingTab(this.app, this))
   
    // Get the view, tagged with LOADER_VIEW_TYPE, assign it a leaf and register it.
    this.registerView(
      LOADER_VIEW_TYPE,
      (leaf) => new LoaderView(leaf)
    );

    this.addRibbonIcon("dice", "Load sections", () => {
      this.activateView();
    });
  }

  async activateView() {
    this.app.workspace.detachLeavesOfType(LOADER_VIEW_TYPE);

    await this.app.workspace.getRightLeaf(false).setViewState({
      type: LOADER_VIEW_TYPE,
      active: true,
    });

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(LOADER_VIEW_TYPE)[0]
    );
  }

  async onunload() {
    this.app.workspace.detachLeavesOfType(LOADER_VIEW_TYPE);
  }

  async loadSettings() {
    const loadedData = await this.loadData()
    this.settings = { ...DEFAULT_SETTINGS, ...loadedData }
  }

  async updateSettings(updates: Partial<LoaderSettings>) {
    Object.assign(this.settings, updates)
    await this.saveData(this.settings)
  }

  getSettingValue<K extends keyof LoaderSettings>(setting: K): LoaderSettings[K] {
    return this.settings[setting]
  }
}
