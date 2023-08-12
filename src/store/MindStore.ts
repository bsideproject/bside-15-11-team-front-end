import { computed, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import { get, post, put } from '../apis/RestApis';
import { MindPostRequestProto, MindPutRequestProto } from '../prototypes/mind/MindRequestProto';
import { MindGetDetailResponseProto, MindPutResponseProto } from '../prototypes/mind/MindResponseProto';

interface Mind {
  sender : string,
  taker : string,
  gift : string
}

class MindStore {

  username : string = "";
  rootStore : typeof RootStore;
  records : Mind[] = [];

  baseUrl : string = process.env.REACT_APP_SERVICE_URI as string;

  constructor(rootStore : typeof RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      records : observable,
      getTotalCount : computed,
      getGiveCount : computed,
      getTakeCount : computed
    });
  }

  get getTotalCount() {
    return this.records.length;
  }

  get getGiveCount() : number {
    let count : number = 0;

    this.records.forEach(record => {
      if (record.sender === this.username) {
        count++;
      }

    });

    return count;
  }

  get getTakeCount() : number {
    let count : number = 0;

    this.records.forEach(record => {
      if (record.taker === this.username) {
        count++;
      }

    });

    return count;
  }

  async setMindCount(setCount?:any) {
    const response = await get(`${this.baseUrl}/api/minds/count`, {
      headers : {
        Authorization : RootStore.userStore.getJwtKey
      }
    });
    if(response) setCount(response);

    return response;
  }

  async postMind(requestBody : MindPostRequestProto) {
    const response = await post(`${this.baseUrl}/api/minds`, requestBody, {
      headers : {
        "Authorization" : RootStore.userStore.getJwtKey
      }
    });


    return response;
  }

  async getMind(sequence : string) : Promise<MindGetDetailResponseProto> {
    const response : MindGetDetailResponseProto = await get(`${this.baseUrl}/api/minds/${sequence}`, {
      headers : {
        "Authorization" : RootStore.userStore.getJwtKey
      }
    });

    return response;
  }

  async putMind(request : MindPutRequestProto) : Promise<MindPutResponseProto> {
    const response : MindPutResponseProto = await put(`${this.baseUrl}/api/minds`, request, {
      headers : {
        Authorization : this.rootStore.userStore.getJwtKey
      }
    });

    return response;
  }
}

export default MindStore;
