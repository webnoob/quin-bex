export interface SettingsStateInterface {
  openBookmarksInNewTab: boolean;
  searchInNewTab: boolean;
  lastTab: string;
  groupBookmarksList: boolean;
  groupBookmarksTree: boolean;
  lastSearch: string;
  quasarNotificationsEnabled: boolean;
}

const state: SettingsStateInterface = {
  openBookmarksInNewTab: false,
  searchInNewTab: false,
  lastTab: 'search',
  groupBookmarksList: false,
  groupBookmarksTree: false,
  lastSearch: '',
  quasarNotificationsEnabled: true
}

export default state
