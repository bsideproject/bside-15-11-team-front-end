import { BirthProto } from "../common/BirthProto";
import { LevelInformationProto } from "../common/LevelInformationProto";

export interface FriendResponseProto {
  sequence?: string;
  nickname?: string;
  relationship?: string;
  birth?: BirthProto;
  memo?: string;
  levelInformation?: LevelInformationProto;
}