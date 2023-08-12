import { DateProto } from "../common/DateProto";
import { ItemProto } from "../common/ItemProto";
import { MindTypeProto } from "../common/type/MindTypeProto";

export interface MindResponseProto {
  sequence?: string;
  type?: MindTypeProto;
  event?: string;
  date?: DateProto;
  item?: ItemProto;
  memo?: string;
}

export interface MindCountResponseProto {
  total?: number;
  given?: number;
  taken?: number;
}

export interface MindGetResponseProto {
  minds?: MindResponseProto[];
}



export interface MindGetDetailResponseProto {
  sequence?: string;
  relationshipSequence?: string;
  type?: MindTypeProto;
  event?: string;
  date?: DateProto;
  item?: ItemProto;
  memo?: string;
}


export interface RelationshipPostResponseProto {
  relationships?: MindResponseProto[];
}

export interface MindPutResponseProto {
  sequence?: string;
  relationshipSequence?: string;
  type?: MindTypeProto;
  event?: string;
  date?: DateProto;
  item?: ItemProto;
  memo?: string;
}

