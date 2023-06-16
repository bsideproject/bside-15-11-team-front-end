import { UserInformation } from "../common/UserInformation";
import { OauthServiceType } from "../common/type/OauthServiceType";

export interface UserGetResponse {
  oauthServiceType?: OauthServiceType;
  userInformation?: UserInformation;
}
