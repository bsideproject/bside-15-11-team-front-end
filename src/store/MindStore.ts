import { computed, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import { get, post, put } from '../apis/RestApis';
import { RelationshipPostRequestProto, RelationshipPutRequestProto } from '../prototypes/relationship/RelationshipRequestProto';
import { RelationshipGetDetailResponseProto, RelationshipPutResponseProto } from '../prototypes/relationship/RelationshipResponseProto';

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
    const response = await get(`${this.baseUrl}/api/relationships/count`, {
      headers : {
        Authorization : RootStore.userStore.getJwtKey
      }
    });

    return response;
  }

  async postMind(requestBody : RelationshipPostRequestProto) {
    const response = await post(`${this.baseUrl}/api/relationships`, requestBody, {
      headers : {
        "Authorization" : RootStore.userStore.getJwtKey
      }
    });


    return response;
  }

  async getMind(sequence : string) : Promise<RelationshipGetDetailResponseProto> {
    const response : RelationshipGetDetailResponseProto = await get(`${this.baseUrl}/api/relationships/${sequence}`, {
      headers : {
        "Authorization" : RootStore.userStore.getJwtKey
      }
    });

    return response;
  }

  async putMind(request : RelationshipPutRequestProto) : Promise<RelationshipPutResponseProto> {
    const response : RelationshipPutResponseProto = await put(`${this.baseUrl}/api/relationships`, request, {
      headers : {
        Authorization : this.rootStore.userStore.getJwtKey
      }
    });

    return response;
  }
}

export default MindStore;
