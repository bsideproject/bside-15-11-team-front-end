import { RelationshipResponseDto } from "../common/RelationshipDto";
import { Date } from "../common/Date";
import { RelationshipType } from "../common/type/RelationshipType";
import { ItemDto } from "../common/ItemDto";

export interface RelationshipGetResponse {
  relationships?: RelationshipResponseDto[];
}

export interface RelationshipGetDetailResponse {
  sequence?: string;
  friendSequence?: string;
  type?: RelationshipType;
  event?: string;
  date?: Date;
  createDate?: Date;
  modifyDate?: Date;
  item?: ItemDto;
  memo?: string;
}

export interface RelationshipPostResponse {
  relationships?: RelationshipResponseDto[];
}

export interface RelationshipPutResponse {
  sequence?: string;
  type?: RelationshipType;
  event?: string;
  date?: Date;
  item?: ItemDto;
  memo?: string;
}