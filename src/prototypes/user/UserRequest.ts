import { UserInformation } from "../common/UserInformation";
import { OauthServiceType } from "../common/type/OauthServiceType";

export interface UserGetRequest {
  oauthServiceType?: OauthServiceType;
  serviceUserId?: string;
}
export interface UserPatchRequest {
  oauthServiceType?: OauthServiceType;
  serviceUserId?: string;
  userInformation?: UserInformation;
}