import { action, computed, makeObservable, observable } from "mobx";
import {get, patch, post, put} from "../apis/RestApis";
import { FriendResponseProto } from "../prototypes/friend/FriendResponse";
import RootStore from "./RootStore";
import { YnTypeProto } from "../prototypes/common/type/YnTypeProto";
import { BirthProto } from "../prototypes/common/BirthProto";

class FriendStore {
    rootStore : typeof RootStore;
    friendList : FriendResponseProto[] = [];
    baseUrl : string = process.env.REACT_APP_SERVICE_URI as string;

    constructor(rootStore : typeof RootStore) {
        this.rootStore = rootStore;
        makeObservable(this, {
            friendList : observable,
            setFriendList : action,
            getFriendList : computed
        });
    }

    setFriendList = async() => {
        const response : FriendResponseProto[] = await get(`${this.baseUrl}/api/friend`, {
            headers : {
                Authorization : RootStore.userStore.getJwtKey
            }
        });

        this.friendList = response;
    };

    get getFriendList() : FriendResponseProto[] {
        return this.friendList;
    }

    // 친구 등록 api
    async setRegisterFriend(
        friendName: string[],
        friendRelation: string,
        friendDirectInput: string,
        friendMemo: string,
        birth: string,
        isLunar: boolean,
        birthUnKnown: boolean,
        getEdit?: string|null,
        getSequence?: string|null,
        setRegisterResponse? : any
    ){
        const request  = {
            nicknames: friendName,
            relationship: friendRelation === "directInput" ? friendDirectInput : friendRelation,
            birth: birthUnKnown ? null : {
                isLunar: isLunar ? "Y" : "N",
                date: {
                    year: parseInt(birth.split("-")[0]),
                    month: parseInt(birth.split("-")[1]),
                    day: parseInt(birth.split("-")[2])
                }
            },
            memo: friendMemo
        };

        try{
            if(getEdit === "edit"){
                const res = await put(`${this.baseUrl}/api/friend/${getSequence}`, request,{
                    headers : {
                        Authorization : this.rootStore.userStore.getJwtKey
                    },
                });

                setRegisterResponse(res);
            }else{
                const res = await post(`${this.baseUrl}/api/friend`, request,{
                    headers : {
                        Authorization : this.rootStore.userStore.getJwtKey
                    },
                });
                setRegisterResponse(res);
            }
        }catch (err){
            console.log("error : " + JSON.stringify(err));
        }
    }

    // 친구 목록 불러오기 - main
    async getFriendListMain(setMainFriendList:any, filterParams:string){
        try{
            const res: FriendResponseProto[] = await get(`${this.baseUrl}/api/friend?&sort=${filterParams}`,{
                headers : {
                    Authorization : this.rootStore.userStore.getJwtKey
                },
            })
            if(res) {
                setMainFriendList(res);
            }

        }catch (err){
            console.log(err);
        }
    }

    // 친구 상세 조회
    async getFriendDetail(sequence:any, setDetailInfo: any){
        try{
            const res = await get(`${this.baseUrl}/api/friend/${sequence}`,{
                headers : {
                    Authorization : this.rootStore.userStore.getJwtKey
                },
            })
            if(res) setDetailInfo(res);
        }catch (err){
            console.log(err);
        }
    }

    // 친구 주고 받은 내역 조회
    async getFriendExchange(sequence:string, sort:string, setExchangeData?:any){
        try{
            const res = await get(`${this.baseUrl}/api/relationships?friendSequence=${sequence}&sort=${sort}`, {
                headers : {
                    Authorization : this.rootStore.userStore.getJwtKey
                },
            });
            if(res) setExchangeData(res);
        }catch (err){
            console.log(err);
        }
    }
}

export default FriendStore;
