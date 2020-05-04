export interface SettingsStateInterface {
  openBookmarksInNewTab: boolean;
  searchInNewTab: boolean;
  lastTab: string;
}

const state: SettingsStateInterface = {
  openBookmarksInNewTab: false,
  searchInNewTab: false,
  lastTab: 'notifications'
}

export default state
