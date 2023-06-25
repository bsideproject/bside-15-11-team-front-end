import axios from "axios";
import { UserGetRequest } from "../prototypes/user/UserRequest";
import { UserResponse } from "../prototypes/user/UserResponse";
import RootStore from "./RootStore";
import { UserInformation } from "../prototypes/common/UserInformation";
import { action, computed, makeObservable, observable } from "mobx";
import { post } from "../apis/RestApis";
import { patch } from "../apis/RestApis";

class UserStore {

  rootStore : typeof RootStore;
  baseUrl : string = process.env.REACT_APP_SERVICE_URI as string;
  jwtKey : string = '';

  constructor(rootStore : typeof RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      jwtKey : observable,
      setJwtKey : action,
      getJwtKey : computed
    });
  }

  setJwtKey = (key : string) => {
    this.jwtKey = key;
  }

  get getJwtKey() : string {
    return this.jwtKey;
  }

  async getUser(request : UserGetRequest) : Promise<UserResponse> {
    const response : any = await axios.get(`${this.baseUrl}/api/users?oauthServiceType=${request.oauthServiceType}&serviceUserId=${request.serviceUserId}`);
    console.log(JSON.stringify(request));
    return response.data;
  }

  async patchUser(request : UserGetRequest, data : any) {
    const serviceType : string = request.oauthServiceType?.toString() as string;
    const serviceUserId : string = request.serviceUserId as string;

    let userInfo : UserInformation = {
      profileNickname : data.properties.nickname,
      profileImageLink : data.properties.profile_image
    };

    const response : any = await patch(`${this.baseUrl}/api/users?oauthServiceType=${serviceType}&serviceUserId=${serviceUserId}`, {
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

    const response : string = await post(`${this.baseUrl}/api/sign`, request, {
      headers : {
        "Content-Type" : "application/json"
      }
    });

    console.log("response body : " + JSON.stringify(response));

    this.setJwtKey(response);
  }

}

export default UserStore;