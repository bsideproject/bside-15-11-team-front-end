import { OauthServiceType } from "../common/type/OauthServiceType";

export interface UserGetRequest {
  oauthServiceType?: OauthServiceType;
  id?: string;
}