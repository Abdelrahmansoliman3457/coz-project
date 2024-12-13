import { defineStore } from "pinia";

// Axios
const axios = useApi();

export const useGlobalStore = defineStore("global", {
  id: 'global',
  state: () => ({
    socials: [],
    mac_address: null,
    providerName: '',
    location_id: null,
    needLogin: null,
    cartCount: null
  }),
  actions: {
    // update_location(location) { this.location_id = location },
    async get_default_location(config) {
      const res = await axios.get("locations", config);
      let status = res.data.key
      let msg = res.data.msg
      let data = res.data.data.data
      if (status == 'success') {
        data.forEach(item => {
          item.is_default == 1 ? this.location_id = item.id : ''
        });
        return { status: "success", msg: msg, data: data };
      } else if (status == 'needActive') {
        return { status: "needActive", msg: msg, data: data };
      } else {
        return { status: "fail", msg: msg, data: data };
      }
    },
    async updateCartCount(config) {
      const res = await axios.get("count-cart", config);
      this.cartCount = res.data.data;
    },
    // need_login() {
    //   this.needLogin = true
    // },
    updateGMacAddress(newMacAddress) {
      this.mac_address = newMacAddress
      // console.log(this.mac_address);
    },
    update_location(location) { this.location_id = location },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
