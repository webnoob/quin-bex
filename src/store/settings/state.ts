export interface SettingsStateInterface {
  openBookmarksInNewTab: boolean;
  searchInNewTab: boolean;
}

const state: SettingsStateInterface = {
  openBookmarksInNewTab: false,
  searchInNewTab: false
}

export default state
