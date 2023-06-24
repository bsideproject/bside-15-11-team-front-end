import { Birth } from "./Birth";

export interface FriendSearchCriteria {
  keyword?: string;
  sort?: string;
  relFilter?: string;
}

export interface FriendCreateDto {
  nicknames?: string[];
  relationship?: string;
  birth?: Birth;
  memo?: string;
}
export interface FriendUpdateDto {
  nickname?: string;
  relationship?: string;
  birth?: Birth;
  memo?: string;
}