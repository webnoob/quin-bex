export interface SearchResultInterface {
  groupName: string;
  children: {
    url: string;
    id: string;
    items: string[];
  }[];
}
