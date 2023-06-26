import axios from "axios";
import { UserGetRequestProto, UserPatchRequestProto } from "../prototypes/user/UserRequestProto";
import { UserResponseProto } from "../prototypes/user/UserResponseProto";
import RootStore from "./RootStore";
import { UserInformationProto } from "../prototypes/common/UserInformationProto";
import { action, computed, makeObservable, observable } from "mobx";
import { get, post } from "../apis/RestApis";
import { patch } from "../apis/RestApis";
import { SexTypeProto } from "../prototypes/common/type/SexTypeProto";

class UserStore {

  rootStore : typeof RootStore;
  baseUrl : string = process.env.REACT_APP_SERVICE_URI as string;
  jwtKey : string = '';
  serviceUserId : string = '';

  constructor(rootStore : typeof RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      jwtKey : observable,
      setJwtKey : action,
      getJwtKey : computed,
      serviceUserId : observable,
    });
  }

  setJwtKey = (key : string) => {
    this.jwtKey = key;
  }

  get getJwtKey() : string {
    return this.jwtKey;
  }

  setServiceUserId = (id : string) => {
    this.serviceUserId = id;
  }

  get getServiceUserId() : string {
    return this.serviceUserId;
  }

  async getUser(request : UserGetRequestProto) : Promise<UserResponseProto> {
    const response : UserResponseProto = await get(`${this.baseUrl}/api/users?oauthServiceType=${request.oauthServiceType}&serviceUserId=${request.serviceUserId}`);
    console.log(JSON.stringify(request));

    if (response.sequence) {
      this.setServiceUserId(response.sequence);
    }
    
    return response;
  }

  async patchUser(requestBody : UserPatchRequestProto) {

    const response : UserPatchRequestProto = await patch(`${this.baseUrl}/api/users`, requestBody, {
      headers : {
        Authorization : this.getJwtKey
      }
    });

    return response;
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