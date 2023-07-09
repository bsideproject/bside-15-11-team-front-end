import { action, computed, makeObservable, observable } from "mobx";
import { get, post } from "../apis/RestApis";
import { FriendResponseProto } from "../prototypes/friend/FriendResponse";
import RootStore from "./RootStore";
import {FriendPostProto} from "../prototypes/friend/FriendRequest";
import {BirthProto} from "../prototypes/common/BirthProto";
import React, {useEffect} from "react";

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

        console.log("friend List : " + JSON.stringify(response));

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
        birthUnKnown: boolean
    ){
        const request  = {
            nicknames: friendName,
            relationship: friendRelation === "directInput" ? friendDirectInput : friendRelation,
            birth: birthUnKnown ? null : {
                isLunar: isLunar ? "Y": "N",
                date: {
                    year: birth.split("-")[0],
                    month: birth.split("-")[1],
                    day: birth.split("-")[2]
                }
            },
            memo: friendMemo
        };
        try{
            const res = await post(`${this.baseUrl}/api/friend`, request,{
                headers : {
                    Authorization : this.rootStore.userStore.getJwtKey
                },
            });
            console.log(res);
        }catch (err){
            console.log(err);
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
            if(res) setMainFriendList(res);

        }catch (err){
            console.log(err);
        }
    }
}

export default FriendStore;
