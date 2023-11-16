import { ItemTypeProto } from "./type/ItemTypeProto";

export interface ItemProto {
  type?: ItemTypeProto;
  name?: string;
  image?: string;
  imageExtension?: string;
  imageLink?: string;
}