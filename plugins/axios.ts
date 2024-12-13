import axios from "axios";
import Cookies from "js-cookie";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://calla-app.com/api/";
  const i18n_redirected = Cookies.get("i18n_redirected");

//   const authCookie = Cookies.get("auth");
//   const authData = authCookie ? JSON.parse(authCookie) : null;
//   const authUser = authData ? authData.authUser : null;

//   let token = "";
//   if (authUser && authUser.token) {
//     token = authUser.token;
//     console.log("authUser.data.token", authUser.token);
//   }

  const lang = i18n_redirected == "en" ? "en" : "ar";
  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
    //   Authorization: `Bearer ${token}`,
      common: {
        lang: lang,
      },
    },
  });
  return {
    provide: {
      axios: api,
    },
  };
});
