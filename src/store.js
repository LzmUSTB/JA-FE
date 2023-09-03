import { makeAutoObservable } from "mobx";
import { getCookie, setCookie, deleteCookie } from "./utils";
import { EXPIRES } from "./constant";

class Store {
    request = ''; // 从百度拿回来的数据
    nextRequest = ''; // 从百度拿回来的新数据
    reply = ''; // 从后端拿回来的数据
    lastReply = ''; // 从后端拿回来的新数据
    id = '';
    conversations = [];

    currentMenu = 'home';

    jwtToken = '';
    nickName = '';
    isLogin = false;

    isLoginModalOpen = false;
    isAssistantModalOpen = true;

    constructor() {
        makeAutoObservable(this);
    }

    setNextRequest(val) {
        this.nextRequest = val;
    }

    setRequest() {
        this.request = this.nextRequest;
    }

    setLastReply(val) {
        this.lastReply = this.lastReply + val;
    }

    setReply() {
        this.reply = `\n\n=============================快乐分隔符😊============================\n${this.lastReply}${this.reply}`;
        this.lastReply = '';
    }

    setId(val) {
        this.id = val;
    }

    addToConversation(val) {
        this.conversations.push(val);
    }

    removeFromConversation() {
        this.conversations.shift();
    }

    setHomeInfo(params) {
        const { nickName } = params;
        if (nickName) {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
        this.nickName = nickName;
    }

    setUserInfo(token, nickName) {
        // this.jwtToken = token;
        this.nickName = nickName;
        this.isLogin = true;
        // setCookie("jwtToken", this.jwtToken, EXPIRES);
        // setCookie("nickName", this.nickName, EXPIRES);
        // console.log("cookie set!");
    }

    logout() {

    }
    
    getJwtToken() {
        // this.jwtToken = getCookie("jwtToken");
        this.nickName = getCookie("nickName");
        if (this.jwtToken) {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
    }

    deleteJwtToken() {
        deleteCookie("jwtToken");
        deleteCookie("nickName");
        this.isLogin = false;
    }
}

const store = new Store();

export default store;