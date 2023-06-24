import { ItemDto } from "./ItemDto";
import { RelationshipType } from "./type/RelationshipType";
import { Date } from './Date';

export interface RelationshipRequestDto {
  friendSequence?: string;
  type?: RelationshipType;
  event?: string;
  date?: Date;
  item?: ItemDto;
  memo?: string;
}

export interface RelationshipResponseDto {
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