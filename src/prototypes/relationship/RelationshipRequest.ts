import { ItemDto } from "../common/ItemDto";
import { RelationshipRequestDto } from "../common/RelationshipDto";
import { RelationshipType } from "../common/type/RelationshipType";
import { SortOrderType } from "../common/type/SortOrderType";
import { Date } from "../common/Date";

export interface RelationshipGetRequest {
  friendSequence?: string;
  sort?: SortOrderType;
}

export interface RelationshipPostRequest {
  relationships?: RelationshipRequestDto[];
}

export interface RelationshipPutRequest {
  sequence?: string;
  type?: RelationshipType;
  event?: string;
  date?: Date;
  item?: ItemDto;
  memo?: string;
}