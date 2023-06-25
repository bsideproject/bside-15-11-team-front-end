import { ItemType } from "./type/ItemType";

export interface ItemDto {
  type?: ItemType;
  name?: string;
  imageLink?: string;
}