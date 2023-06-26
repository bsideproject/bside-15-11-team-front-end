import { DateProto } from "./DateProto";
import { ItemProto } from "./ItemProto";
import { RelationshipTypeProto } from "./type/RelationshipTypeProto";

export interface RelationshipRequestProto {
  friendSequence?: string;
  type?: RelationshipTypeProto;
  event?: string;
  date?: DateProto;
  item?: ItemProto;
  memo?: string;
}

export interface RelationshipResponseProto {
  sequence?: string;
  friendSequence?: string;
  type?: RelationshipTypeProto;
  event?: string;
  date?: DateProto;
  createDate?: DateProto;
  modifyDate?: DateProto;
  item?: ItemProto;
  memo?: string;
}