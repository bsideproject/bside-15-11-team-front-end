import { computed, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import axios from 'axios';
import { get } from '../apis/RestApis';

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

  async setMindCount() {
    console.log("jwt key : " + this.rootStore.userStore.getJwtKey);
    const response = await get(`${this.baseUrl}/api/relationships/count`, {
      headers : {
        Authorization : this.rootStore.userStore.getJwtKey
      }
    });

    console.log("setMindCount : " + JSON.stringify(response));

    return response;
  }
}

export default MindStore;