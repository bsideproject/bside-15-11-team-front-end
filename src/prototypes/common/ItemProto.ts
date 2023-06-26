import { ItemTypeProto } from "./type/ItemTypeProto";

export interface ItemProto {
  type?: ItemTypeProto;
  name?: string;
  imageLink?: string;
}