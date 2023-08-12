import { DateProto } from "../common/DateProto";
import { ItemProto } from "../common/ItemProto";
import { MindTypeProto } from "../common/type/MindTypeProto";
import { SortOrderTypeProto } from "../common/type/SortOrderTypeProto";

export interface MindRequestProto {
  relationshipSequence?: string;
  type?: MindTypeProto;
  event?: string;
  date?: DateProto;
  item?: ItemProto;
  memo?: string;
}

export interface MindGetRequestProto {
  relationshipSequence?: string;
  sort?: SortOrderTypeProto;
}

export interface MindPostRequestProto {
  minds?: MindRequestProto[];
}

export interface MindPutRequestProto {
  sequence?: string;
  relationshipSequence?: string;
  type?: MindTypeProto;
  event?: string;
  date?: DateProto;
  item?: ItemProto;
  memo?: string;
}


