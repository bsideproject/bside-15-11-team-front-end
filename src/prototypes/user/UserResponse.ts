import { UserInformation } from "../common/UserInformation";
import { OauthServiceType } from "../common/type/OauthServiceType";

export interface UserResponse {
  sequence?: string;
  oauthServiceType?: OauthServiceType;
  userInformation?: UserInformation;
}
