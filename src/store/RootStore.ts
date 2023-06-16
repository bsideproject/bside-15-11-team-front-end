import KakaoStore from './KakaoStore';
import MindStore from './MindStore';

class RootStore {

  mindStore : MindStore;
  kakaoStore : KakaoStore;

  constructor() {
    this.mindStore = new MindStore(this);
    this.kakaoStore = new KakaoStore(this);
  }
}

export default new RootStore();