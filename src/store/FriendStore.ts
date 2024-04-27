import { action, computed, makeObservable, observable } from "mobx";
import {get, patch, post, put} from "../apis/RestApis";
import { RelationshipResponseProto } from "../prototypes/relationship/RelationshipResponseProto";
import RootStore from "./RootStore";
import { MindGetResponseProto } from "../prototypes/mind/MindResponseProto";
import { RelationshipPutRequestProto } from "../prototypes/relationship/RelationshipRequestProto";
import NullChecker from '../utils/NullChecker';

class FriendStore {
    rootStore : typeof RootStore;
    friendList : RelationshipResponseProto[] = [];
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
        const response : RelationshipResponseProto[] = await get(`${this.baseUrl}/api/relationships`, {
            headers : {
                Authorization : RootStore.userStore.getJwtKey
            }
        });

        this.friendList = response;
    };

    get getFriendList() : RelationshipResponseProto[] {
        return this.friendList;
    }

    // 친구 등록 api
    async setRegisterFriend(
        friendName: string[],
        friendMemo: string,
        birth: string,
        isLunar: boolean,
        birthUnKnown: boolean,
        getEdit?: string|null,
        getSequence?: string|null,
        setRegisterResponse? : any
    ){
        const request  = {
            [getEdit === "edit" ? "nickname" : "nicknames"]: getEdit === "edit" ? friendName[0] : friendName,
            relationship: null,
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
                const res = await put(`${this.baseUrl}/api/relationships/${getSequence}`, request,{
                    headers : {
                        Authorization : this.rootStore.userStore.getJwtKey
                    },
                });

                setRegisterResponse(res);
            }else{
                const res = await post(`${this.baseUrl}/api/relationships`, request,{
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

    async putFriend(friendSeq : string | undefined | null, request : RelationshipPutRequestProto) {

        if (!request || NullChecker.isEmpty(friendSeq)) {
            return;
        }

        try {
            const res = await put(`${this.baseUrl}/api/relationships/${friendSeq}`, request, {
                headers : {
                    Authorization : this.rootStore.userStore.getJwtKey
                }
            });

            console.log("res : " + JSON.stringify(res));
        } catch(error) {
            console.error("error : " + JSON.stringify(error));
        }
    }

    // 친구 목록 불러오기 - main
    async getFriendListMain(setMainFriendList:any, filterParams:string){
        try{
            const res: RelationshipResponseProto[] = await get(`${this.baseUrl}/api/relationships?sort=${filterParams}`,{
                headers : {
                    Authorization : this.rootStore.userStore.getJwtKey
                },
            })

            if(res) {
                console.log("res : " + JSON.stringify(res));
                setMainFriendList([...res]);
            }

        }catch (err){
            console.log(err);
        }
    }

    // 친구 상세 조회
    async getFriendDetail(sequence:any, setDetailInfo: any){
        try{
            const res : RelationshipResponseProto = await get(`${this.baseUrl}/api/relationships/${sequence}`,{
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
            const res : MindGetResponseProto = await get(`${this.baseUrl}/api/minds?relationshipSequence=${sequence}&sort=${sort}`, {
                headers : {
                    Authorization : this.rootStore.userStore.getJwtKey
                },
            });

            if(res) setExchangeData(res);
        }catch (err){
            console.log(err);
        }
    }

    convertRes2PutReq = (friend : RelationshipResponseProto) : RelationshipPutRequestProto => {
        let req : RelationshipPutRequestProto = {

        };

        if (friend) {
            req = {
                nickname : friend.nickname,
                relationship : friend.relationship,
                birth : friend.birth,
                memo : friend.memo,
                favoriteYn : friend.favoriteYn
            }
        }

        return req;
    }
}

export default FriendStore;
