import FriendStore from './FriendStore';
import MindStore from './MindStore';
import UserStore from './UserStore';

class RootStore {

  mindStore : MindStore;
  userStore : UserStore;
  friendStore : FriendStore;

  constructor() {
    this.mindStore = new MindStore(this);
    this.userStore = new UserStore(this);
    this.friendStore = new FriendStore(this);
  }
}

export default new RootStore();