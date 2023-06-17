import KakaoStore from './KakaoStore';
import MindStore from './MindStore';
import UserStore from './UserStore';

class RootStore {

  mindStore : MindStore;
  kakaoStore : KakaoStore;
  userStore : UserStore;

  constructor() {
    this.mindStore = new MindStore(this);
    this.kakaoStore = new KakaoStore(this);
    this.userStore = new UserStore(this);
  }
}

export default new RootStore();