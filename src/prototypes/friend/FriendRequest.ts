import { Birth } from "./Birth";

export interface FriendCreateDto {
  nicknames?: string[];
  relationship?: string;
  birth?: Birth;
  memo?: string;
}
