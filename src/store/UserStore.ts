import axios from "axios";
import { OauthServiceType } from "../prototypes/common/type/OauthServiceType";
import { UserGetRequest } from "../prototypes/user/UserRequest";
import { UserGetResponse } from "../prototypes/user/UserResponse";
import RootStore from "./RootStore";
import { UserInformation } from "../prototypes/common/UserInformation";

class UserStore {

  rootStore : typeof RootStore;
  baseUrl : string = process.env.REACT_APP_SERVICE_URI as string;

  constructor(rootStore : typeof RootStore) {
    this.rootStore = rootStore;
  }

  async getUser(request : UserGetRequest) : Promise<UserGetResponse> {
    const response : any = await axios.get(`${this.baseUrl}/api/users?oauthServiceType=${request.oauthServiceType}&serviceUserId=${request.id}`);
    console.log(JSON.stringify(request));
    return response.data;
  }

  async patchUser(request : UserGetRequest, data : any) {
    const serviceType : string = request.oauthServiceType?.toString() as string;
    const serviceUserId : string = request.id as string;

    let userInfo : UserInformation = {
      profileNickname : data.properties.nickname,
      profileImageLink : data.properties.profile_image
    };

    const response : any = await axios.patch(`${this.baseUrl}/api/users?oauthServiceType=${serviceType}&serviceUserId=${serviceUserId}`, {
      oauthServiceType : serviceType,
      serviceUserId : serviceUserId,
      userInformation : userInfo
    });

    return response.data;
  }

  async postUser(sequence : string) {
    const request : object = {
      sequence : sequence
    };

    await axios.post(`${this.baseUrl}/api/sign`, request, {
      headers : {
        "Content-Type" : "application/json"
      }
    });
  }

}

export default UserStore;