import { LevelInformation } from "../common/LevelInformation";
import { Birth } from "./Birth";

export interface FriendDto {
  sequence?: string;
  nickname?: string;
  relationship?: string;
  birth?: Birth;
  memo?: string;
  levelInformation?: LevelInformation;
}
