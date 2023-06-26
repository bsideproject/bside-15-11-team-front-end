import { UserInformationProto } from "../common/UserInformationProto";
import { OauthServiceTypeProto } from "../common/type/OauthServiceTypeProto";

export interface UserGetRequestProto {
  oauthServiceType?: OauthServiceTypeProto;
  serviceUserId?: string;
}

export interface UserPatchRequestProto {
  oauthServiceType?: OauthServiceTypeProto;
  serviceUserId?: string;
  userInformation?: UserInformationProto;
}