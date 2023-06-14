import MindStore from './MindStore';

class RootStore {

  mindStore : MindStore;

  constructor() {
    this.mindStore = new MindStore(this);
  }
}

export default new RootStore();