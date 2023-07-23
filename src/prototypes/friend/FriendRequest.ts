import { BirthProto } from "../common/BirthProto";

export interface FriendGetCriteriaProto {
  keyword?: string;
  sort?: string;
  relFilter?: string;
}
export interface FriendPostProto {
  nicknames?: string[];
  relationship?: string;
  birth?: BirthProto;
  memo?: string;
}
export interface FriendPutProto {
  nickname?: string;
  relationship?: string;
  birth?: BirthProto;
  memo?: string;
}