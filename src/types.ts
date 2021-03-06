export interface AlgoliaSearchResultHierarchyItem {
  value: string;
  matchLevel: string;
  matchedWords: string[];
}

export interface AlgoliaSearchResult {
  anchor: string;
  content?: string;
  _snippetResult: {
    content: AlgoliaSearchResultHierarchyItem;
  };
  _highlightResult: {
    hierarchy: {
      lvl0: AlgoliaSearchResultHierarchyItem;
      lvl1: AlgoliaSearchResultHierarchyItem;
      lvl2: AlgoliaSearchResultHierarchyItem;
      lvl3: AlgoliaSearchResultHierarchyItem;
      lvl4: AlgoliaSearchResultHierarchyItem;
      lvl5: AlgoliaSearchResultHierarchyItem;
      lvl6: AlgoliaSearchResultHierarchyItem;
    };
  };
  objectID: string;
  url: string;
}

export interface SearchResultItem {
  id: string;
  type: string;
  text: string;
}

export interface SearchResult {
  id: string;
  groupName: string;
  children: {
    id: string;
    url: string;
    items: SearchResultItem[];
  }[];
}

export interface GroupedBookmark {
  label: string;
  level: number;
  url: string;
  children: GroupedBookmark[];
  bookmark: Bookmark;
}

export interface Bookmark {
  url: string;
  label?: string;
  id: string;
}

export type QuasarNotification = {
  id: string;
  title: string;
  message: string;
  link: string;
  postNotification: boolean;
  timestamp: number;
}
