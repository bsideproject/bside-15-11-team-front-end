import { UserInformationProto } from "../common/UserInformationProto";
import { OauthServiceTypeProto } from "../common/type/OauthServiceTypeProto";

export interface UserResponseProto {
  sequence?: string;
  oauthServiceType?: OauthServiceTypeProto;
  userInformation?: UserInformationProto;
}