import { defineStore } from "pinia";
// import Cookies from 'js-cookie'

// Axios
const axios = useApi();

// success response
const { response } = responseApi();

// toastNotify
// const { toastNotify } = toastMsg();



// device id confige
const apiKey =
  "BBU2E4e0vA2DjHEejZNsfuOIUvz1qjHAE05B1b786gTf9n-zCAwQW2fskzS1f-3h13ZIZ9EhjalS-EDb4E2VK_Q";
  const firebaseConfig = {
    apiKey: "AIzaSyDzlZ9H_EyMk4b2M6UvW5-fSZMCnnqMuEQ",
    authDomain: "triple-car-d1471.firebaseapp.com",
    projectId: "triple-car-d1471",
    storageBucket: "triple-car-d1471.appspot.com",
    messagingSenderId: "449693088235",
    appId: "1:449693088235:web:004c5edf1062547f2301ae",
    measurementId: "G-T6YQMWGJTM",
  };

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: {},
    countriesStore: [],
    token: null,
    isLoggedIn: false,
    newPhone: null,
    macAddress: null,
    notificationToken: null,
    notificationCount: null,
    notStutus: false,
    device_id: 'jalkljlddkh',
    isNavigatingToLogin: false,
    notRoute: 1,
    messageCount: 1,
    logoWeb: null,
    toastNum : 0,
    toastMsgMain : '',
    
    showLoginModal: 0,
  }),
  getters: {
    user: (state) => state.authUser,
    // logedout: (state) => state.logoutRes,
  },
  actions: {
    // generate device id
    async createFcmToken(initializeApp, getMessaging, getToken) {
      initializeApp(firebaseConfig);
      const messaging = getMessaging();
      const currentToken = getToken(messaging, { PublicVapidKey: apiKey });
      if (currentToken) {
        console.log("from auth", currentToken);
        this.device_id = currentToken;
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    },

    // Sign Up
    async profileInfoHandler(formData) {
      const res = await axios.post("send-otp", formData);
      let status = res.data.key;
      let msg = res.data.msg;
      let data = res.data.data;
      if (status == "success") {
        return { status: "success", msg: msg, data: data };
      } else {
        return { status: "error", msg: msg };
      }
    },
    // update profile
    async updateProfile(formData) {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };
      const res = await axios.post("update-profile?_method=put", formData , config);
      let status = res.data.key;
      let msg = res.data.msg;
      let data = res.data.data;
      if (status == "success") {
        this.authUser = data;
        return { status: "success", msg: msg, data: data };
      } else {
        return { status: "error", msg: msg };
      }
    },


    runToast(msg) {
      this.toastNum = this.toastNum + 1;
      this.toastMsgMain = msg 
    },

    // Verification Code
    async handelVerification(formData) {
      formData.append("deviceId", this.device_id);
      
      const res = await axios.post("signin", formData).catch((error) => {
        this.runToast(error.response?.data.message)
        console.log(error);
        
        // return
      }  );

      if (res == undefined) {
        return
      }

      console.log(res == undefined);
      
      let status = res.data.key;
      let msg = res.data.message;
      let data = res.data.data;
      
      if (status == "success") {
        this.authUser = data;
        this.token = data.token;
        this.isLoggedIn = true;
        this.notStutus = data.is_notify;
        this.notRoute = this.notRoute + 1;
        return { status: "success", msg: msg, data: data };
      } else if (status == "not_exist") {
        return { status: "not_exist", msg: msg, data: data };
      } else {
        return { status: "error", msg: msg };
      }
    },
    async compProfileInfoHandler(formData) {
      formData.append("device_id", this.device_id);
      
      const res = await axios.post("sign-up", formData);
      let status = res.data.key;
      let msg = res.data.msg;
      let data = res.data.data;
      if (status == "success") {
        this.authUser = data;
        this.token = data.token;
        this.isLoggedIn = true;
        this.notStutus = data.is_notify;
        return { status: "success", msg: msg, data: data };
      } else if (status == "not_exist") {
        return { status: "not_exist", msg: msg, data: data };
      } else {
        return { status: "error", msg: msg };
      }
    },

    // Logout
    async handelLogout() {
      const formData = new FormData();
      formData.append("deviceId", this.device_id);
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };
      const res = await axios.post(
        `signout`, formData, 
        config
      );
      let status = res.data.key;
      let msg = res.data.message;
      if (
        status == "success" ||
        status == "blocked" ||
        status == "unauthenticated"
      ) {
        // this.user = {
        //   phone: "",
        //   country_code: "",
        // };
        this.token = null;
        this.authUser = null;
        this.isLoggedIn = false;
        this.notStutus = false;
        this.notificationCount = 0

        return { status: "success", msg: msg };
      } else {
        return { status: "error", msg: msg };
      }
    },
    // getCount
    async getCount() {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };
      const res = await axios.get(
        `count-notifications`,
        config
      );
      let status = res.data.key;
      let msg = res.data.msg;
      if (
        status == "success" 
      ) {
        this.notificationCount = res.data.data.count
        // console.log(res.data.data.count);
        

        return { status: "success", msg: msg };
      } else {
        // navigateTo("/");
        return { status: "error", msg: msg };
      }
    },
    async plusNotification() {
      this.notificationCount = this.notificationCount + 1
    },
    async hasMessaage() {
      this.messageCount = this.messageCount + 1
    },

    // delete account
    async deleteAccountHandler(formData) {
      formData.append("device_id", this.device_id);
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      const res = await axios.post("delete-account", formData, config);
      let status = res.data.key;
      let msg = res.data.msg;
      if (
        status == "success" ||
        status == "blocked" ||
        status == "unauthenticated"
      ) {
        this.token = null;
        this.isLoggedIn = false;
        this.authUser = null;
        this.notificationCount = 0
        // navigateTo("/");
        return { status: "success", msg: msg };
      } else {
        return { status: "error", msg: msg };
      }
    },

    // New Phone
    async updatePhone(formData, newPhone) {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      const resData = await axios.post(
        "change-phone-send-code",
        formData,
        config
      );
  
      if (response(resData).status == "success") {
        
        // this.newPhone = newPhone;
        
        if(this.authUser){
          this.authUser.phone = newPhone;
        }


        // navigateTo("/profile/codePhone");
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }
    },
    // getCountries
    async getCountriesStore() {
      
      const res = await axios.get("countries");
   
      
      let status = res.data.key;
      let msg = res.data.msg;
      let data = res.data.data;
      if (status == "success") {
        this.countriesStore = data 
        
        return { status: "success", msg: msg };

      }  else {
        return { status: "error", msg: msg };
      }

    },
    // getLogo
    async getLogoFromStore() {
      
      const res = await axios.get("setting/logo");
   
      
      let status = res.data.key;
      let msg = res.data.msg;
      let data = res.data;
      if (status == "success") {
        this.logoWeb = data.data 
        console.log(data);
        
        
        return { status: "success", msg: msg };

      }  else {
        return { status: "error", msg: msg };
      }

    },
    // stored device id
    async storeDeviceId(deviceId) {
      this.device_id = deviceId;
    },

    setIsNavigatingToLogin(value) {
      this.isNavigatingToLogin = value;
    },
  },
  persist: {
    storage: process.client ? localStorage : "",
    // storage: persistedState.cookiesWithOptions({
    //   sameSite: "strict",

    //   // storage: window.localStorage,

    // }),
  },
});
