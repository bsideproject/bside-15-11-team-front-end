import { AgeRangeType } from "./type/AgeRangeType";
import { SexType } from "./type/SexType";
import { Date } from "./Date";

export interface UserInformation {
  profileNickname?: string;
  profileImageLink?: string;
  sexType?: SexType;
  ageRangeType?: AgeRangeType;
  birth?: Date;
}
