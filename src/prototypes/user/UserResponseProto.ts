import { AllowInformationProto } from "../common/AllowInformation";
import { UserInformationProto } from "../common/UserInformationProto";
import { OauthServiceTypeProto } from "../common/type/OauthServiceTypeProto";

export interface UserResponseProto {
  userInformation?: UserInformationProto;
  allowInformation?: AllowInformationProto;
}