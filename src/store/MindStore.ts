import { action, computed, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';

interface Mind {
  sender : string,
  taker : string,
  gift : string
}

class MindStore {

  username : string = "";
  rootStore : typeof RootStore;
  records : Mind[] = [];

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
}

export default MindStore;