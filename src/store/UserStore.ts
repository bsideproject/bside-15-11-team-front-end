import { UserPatchRequestProto } from "../prototypes/user/UserRequestProto";
import { UserResponseProto } from "../prototypes/user/UserResponseProto";
import RootStore from "./RootStore";
import { action, computed, makeObservable, observable } from "mobx";
import { get, post } from "../apis/RestApis";
import { patch } from "../apis/RestApis";
import { UserInformationProto } from "../prototypes/common/UserInformationProto";
import { AllowInformationProto } from './../prototypes/common/AllowInformation';
import { SignWithdrawlRequestProto } from "../prototypes/sign/SignRequestProto";
import { YnTypeProto } from "../prototypes/common/type/YnTypeProto";

class UserStore {

  rootStore : typeof RootStore;
  baseUrl : string = process.env.REACT_APP_SERVICE_URI as string;
  jwtKey : string = '';
  serviceUserId : string = '';
  userName : string = '';
  userInformation : UserInformationProto = {};
  allowInformation : AllowInformationProto = {};

  constructor(rootStore : typeof RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      jwtKey : observable,
      setJwtKey : action,
      getJwtKey : computed,

      serviceUserId : observable,
      setServiceUserId : action,
      getServiceUserId : computed,

      userName : observable,
      setUserName : action,
      getUserName : computed,

      userInformation : observable,
      setUserInformation : action,
      getUserInformation : computed,

      allowInformation : observable,
      setAllowInformation : action,
      getAllowInformation : computed,
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

  setUserName = (name : string) => {
    this.userName = name;
  }

  get getUserName() : string {
    return this.userName;
  }

  setUserInformation = (data : UserInformationProto) => {
    this.userInformation = data;
  }

  get getUserInformation() : UserInformationProto {
    return this.userInformation;
  }

  setAllowInformation = (data : AllowInformationProto) => {
    this.allowInformation = data;
  }

  get getAllowInformation() : AllowInformationProto {
    return this.allowInformation;
  }

  async getUser() : Promise<UserResponseProto> {
    const response : UserResponseProto = await get(`${this.baseUrl}/api/users`, {
      headers : {
        Authorization : this.jwtKey
      }
    });
    

    if (response.userInformation) {
      this.setUserName(response?.userInformation?.profileNickname as string);

      this.setUserInformation(response.userInformation);
    }

    if (response.allowInformation) {
      this.setAllowInformation(response.allowInformation);
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

    this.setJwtKey(response);
  }

  async editNickname(nickname : string) {
    let userInfo : UserInformationProto = this.getUserInformation;

    userInfo.profileNickname = nickname;

    const allowInfo : AllowInformationProto = this.getAllowInformation;

    const userPatchRequest : UserPatchRequestProto = {
      userInformation : userInfo,
      allowInformation : allowInfo
    };

    const response = await patch(`${this.baseUrl}/api/users`, userPatchRequest, {
      headers : {
        Authorization : this.getJwtKey
      }
    });

    return response;
  }

  async changeAllowInformation(flag : boolean) {
    let allowInformation : AllowInformationProto = this.getAllowInformation;
    const userInformation : UserInformationProto = this.getUserInformation;

    allowInformation.eventMarketingYn = flag ? YnTypeProto.Y : YnTypeProto.N;

    const userPatchRequest : UserPatchRequestProto = {
      userInformation : userInformation,
      allowInformation : allowInformation
    };

    const response = await patch(`${this.baseUrl}/api/users`, userPatchRequest, {
      headers : {
        Authorization : this.getJwtKey
      }
    });

    return response;
  }


  async deleteUser(reason : string) {
    const withdrawRequest : SignWithdrawlRequestProto = {
      withdrawlReason : reason
    };

    const response = await post(`${this.baseUrl}/api/sign/withdrawl`, withdrawRequest, {
      headers : {
        Authorization : this.getJwtKey
      }
    });

    return response;
  }

}

export default UserStore;