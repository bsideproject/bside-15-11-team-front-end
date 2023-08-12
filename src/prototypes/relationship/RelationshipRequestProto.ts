import { BirthProto } from "../common/BirthProto";
import { SortOrderTypeProto } from "../common/type/SortOrderTypeProto";

export interface RelationshipGetRequestProto {
  keyword?: string;
  sort?: SortOrderTypeProto;
}

export interface RelationshipPostRequestProto {
  nicknames?: string[];
  relationship? : string;
  birth? : BirthProto;
  memo? : string;
}

export interface RelationshipPutRequestProto {
  nickname? : string;
  relationship? : string;
  birth? : BirthProto;
  memo? : string;
}

export enum SortTypeProto {
  NICKNAME, LEVEL
}