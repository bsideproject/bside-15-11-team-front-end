export interface RelationLevelProto {
  sequence?: string;
  title?: string;
  description?: string;
  level?: number;
  countFrom?: number;
  countTo?: number;
}

export interface RelationLevelGetCriteriaProto {
  searchKey? : string;
  searchValue? : string;
}