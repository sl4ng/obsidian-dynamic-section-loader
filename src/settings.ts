import {App, PluginSettingTab, Setting} from 'obsidian'

import type LoaderPlugin from "./main"
import type { GroupByType, LookAndFeel, SortDirection } from "./_types"

export interface LoaderSettings {
  testSetting: string
}

export const DEFAULT_SETTINGS: LoaderSettings = {
  testSetting: "testsetting"
}

export class LoaderSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: LoaderPlugin) {
    super(app, plugin)
  }

  display(): void {
    this.containerEl.empty()

    this.containerEl.createEl("h3", {
      text: "General Settings",
    })

    this.buildSettings()
  }

  private buildSettings() {
    /** GENERAL */

    new Setting(this.containerEl).setName("General")

    new Setting(this.containerEl)
      .setName("Test Setting")
      .setDesc(
        'This is just to test wether or not my setting showes up'
      )
      .addTextArea((text) =>
        text
          .setPlaceholder("todo")
          .setValue(this.plugin.getSettingValue("testSetting"))
          .onChange(async (value) => {
            await this.plugin.updateSettings({ testSetting: value })
          })
      )

  }
}
