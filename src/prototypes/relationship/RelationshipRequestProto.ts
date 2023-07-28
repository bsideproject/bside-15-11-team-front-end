import { DateProto } from "../common/DateProto";
import { ItemProto } from "../common/ItemProto";
import { RelationshipRequestProto } from "../common/RelationshipProto";
import { RelationshipTypeProto } from "../common/type/RelationshipTypeProto";
import { SortOrderTypeProto } from "../common/type/SortOrderTypeProto";

export interface RelationshipGetRequestProto {
  friendSequence?: string;
  sort?: SortOrderTypeProto;
}

export interface RelationshipPostRequestProto {
  relationships?: RelationshipRequestProto[];
}

export interface RelationshipPutRequestProto {
  sequence: string;
  friendSequence : string;
  type?: RelationshipTypeProto;
  event?: string;
  date?: DateProto;
  item?: ItemProto;
  memo?: string;
}