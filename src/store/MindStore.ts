import { computed, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import { get, post } from '../apis/RestApis';
import { RelationshipPostRequestProto } from '../prototypes/relationship/RelationshipRequestProto';

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
    if(response) setCount(response);
    console.log("setMindCount : " + JSON.stringify(response));

    return response;
  }

  async postMind(requestBody : RelationshipPostRequestProto) {
    const response = await post(`${this.baseUrl}/api/relationships`, requestBody, {
      headers : {
        "Authorization" : RootStore.userStore.getJwtKey
      }
    });

    console.log("postMind : " + JSON.stringify(response));

    return response;
  }
}

export default MindStore;
