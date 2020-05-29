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
