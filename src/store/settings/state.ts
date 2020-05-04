export interface SettingsStateInterface {
  openBookmarksInNewTab: boolean;
  searchInNewTab: boolean;
  lastTab: string;
  groupBookmarksList: boolean;
  groupBookmarksTree: boolean;
}

const state: SettingsStateInterface = {
  openBookmarksInNewTab: false,
  searchInNewTab: false,
  lastTab: 'notifications',
  groupBookmarksList: false,
  groupBookmarksTree: false
}

export default state
