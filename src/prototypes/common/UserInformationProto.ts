import { DateProto } from "./DateProto";
import { AgeRangeTypeProto } from "./type/AgeRangeTypeProto";
import { SexTypeProto } from "./type/SexTypeProto";

export interface UserInformationProto {
  profileNickname?: string;
  profileImageLink?: string;
  sexType?: SexTypeProto;
  ageRangeType?: AgeRangeTypeProto;
  birth?: DateProto;
}