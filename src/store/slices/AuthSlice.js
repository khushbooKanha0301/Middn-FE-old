import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import jwtAxios, { setAuthToken } from "../../service/jwtAxios";
import { setLoading } from "./commonSlice";
import { notificationFail, notificationSuccess } from "./notificationSlice";
// import { countryCodes } from "../countryCodes";
import axios from "axios";
import apiConfigs from "../../config/config";
import listData from "../../layout/accountSetting/countryData";
import { database, firebaseMessages } from "../../layout/chat/config";
import { child, get, ref, set, update } from "firebase/database";

const authTokenData = JSON.parse(window?.localStorage?.getItem("userData"))
  ?.authToken
  ? JSON.parse(window.localStorage.getItem("userData")).authToken
  : null;
const accountData = JSON.parse(window?.localStorage?.getItem("userData"))
  ?.account
  ? JSON.parse(window.localStorage.getItem("userData")).account
  : "Connect Wallet";
const useridData = JSON.parse(window?.localStorage?.getItem("userData"))?.userid
  ? JSON.parse(window.localStorage.getItem("userData")).userid
  : null;
const imageUrlData = JSON.parse(window?.localStorage?.getItem("userData"))
  ?.imageUrl
  ? JSON.parse(window.localStorage.getItem("userData")).imageUrl
  : null;

const initialState = {
  authdata: {
    account: accountData,
    authToken: authTokenData,
    userid: useridData,
    imageUrl: imageUrlData,
  },
  countryDetails: null,
};

export const checkAuth = createAsyncThunk(
  "checkAuth",
  async (action, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      let resBody = null;
      let account = action.account;
      let library = action.library;
      let checkValue = action.checkValue;
      var deactivate = action.deactivate;

      let signMessage = action.signMessage;
      let hideLoginModal = action.hideLoginModal;

      let signature;
      if (action.signature) {
        signature = action.signature;
      }
      let userData = {
        account: "Connect Wallet",
        authToken: null,
        userid: null,
      };
      // let signData = action.signData;
      if (!signature) {
        let response = await jwtAxios
          .get(`/auth/nonce/${account}`, {
            headers: {
              "ngrok-skip-browser-warning": true,
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((response) => {
            resBody = response.data;
            setAuthToken(resBody.tempToken);
            return response.data;
          })
          .catch((error) => {
            window.localStorage.removeItem("token");
            window.localStorage.clear();
          });
        let provider = window.localStorage.getItem("provider");

        if (provider == "fortmatic") {
          signature = await window.web3.eth.personal.sign(
            resBody.message,
            account
          );
        } else if (provider == "coinbaseWallet") {
          signMessage({ message: resBody.message });
        } else if (provider == "walletConnect") {
          signMessage({ message: resBody.message });
        } else {
          signature = await library
            .getSigner(account)
            .signMessage(resBody.message);
        }
      }

      if (signature) {
        let verifyTokenData = await axios
          .post(
            `${apiConfigs.BASE_URL}users/verify?signatureId=${signature}`,
            { walletType: checkValue },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .catch((error) => {
            if (error.response.data.message) {
              dispatch(notificationFail(error.response.data.message));
            } else {
              dispatch(
                notificationSuccess(
                  "Something Went Wrong. Can you please Connect wallet again?"
                )
              );
            }
            window.localStorage.removeItem("token");
            window.localStorage.clear();
            deactivate();
          });

        if (verifyTokenData.data.token) {
          window.localStorage.setItem("token", verifyTokenData.data.token);
          // setAuthToken(verifyTokenData.data.token)
          userData = {
            account: account,
            authToken: verifyTokenData.data.token,
            userid: verifyTokenData.data.userInfo._id,
            imageUrl: verifyTokenData.data.imageUrl,
          };

          window.localStorage.setItem("userData", JSON.stringify(userData));
          if (hideLoginModal) {
            hideLoginModal();
          }
          const dbRef = ref(database);
          get(
            child(dbRef, firebaseMessages?.CHAT_USERS + userData?.account)
          ).then((snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
              update(
                ref(database, firebaseMessages?.CHAT_USERS + userData?.account),
                {
                  isOnline: true,
                  lastActive: Date.now(),
                }
              );
            }
          });
          // update(ref(database, firebaseMessages.CHAT_USERS + userData?.account), {isOnline:true});
          dispatch(setLoading(false));
          if (
            verifyTokenData.data?.userInfo?.is_2FA_login_verified ===
              undefined ||
            verifyTokenData.data?.userInfo?.is_2FA_login_verified === true
          ) {
            dispatch(notificationSuccess("user login successfully"));
          }

          return userData;
        }
      }
    } catch (error) {
      dispatch(setLoading(false));
      window.localStorage.clear();
      deactivate();
      return {
        account: "Connect Wallet",
        authToken: null,
        userid: null,
      };
    }
  }
);

export const logoutAuth = createAsyncThunk(
  "logoutAuth",
  async (action, { dispatch }) => {
    try {
      jwtAxios
        .get(`/users/logout`)
        .then(() => {
          setAuthToken(null);
          window.localStorage.clear();
          window.localStorage.removeItem("token");
        })
        .catch((error) => {
          dispatch(notificationFail("Something went wrong"));
          dispatch(setLoading(false));
        });

      window.localStorage.removeItem("userData");
      let userData = {
        account: "Connect Wallet",
        authToken: null,
        userid: null,
      };
      dispatch(setLoading(false));
      return userData;
    } catch (error) {
      dispatch(setLoading(false));
      return error.message;
    }
  }
);

export const userGetData = createAsyncThunk(
  "userGetData",
  async (action, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const userid = action;
      let user = {};
      let imageUrl = "";
      const token = localStorage.getItem("token");
      await jwtAxios
        .get(`/users/getuser`)
        .then((response) => {
          user = response.data.User;
          imageUrl = response.data.imageUrl;
        })
        .catch((error) => {
          dispatch(notificationFail("Something went wrong with get user"));
        });
      dispatch(setLoading(false));
      return { ...user, imageUrl: imageUrl };
    } catch (error) {
      dispatch(setLoading(false));
      return error.message;
    }
  }
);

export const getCountryDetails = createAsyncThunk(
  "getCountryDetails",
  async (action, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      // const response = await fetch ("https://ipapi.co/json/");
      const response = await fetch(`https://geolocation-db.com/json/`).then(
        (res) => res.json()
      );
      dispatch(setLoading(false));
      let country_calling_code =
        listData.find((x) => x.iso === response?.country_code).code || "";
      let countryData = Object.assign(response, {
        country_calling_code: country_calling_code,
      });
      return countryData;
    } catch (error) {
      dispatch(setLoading(false));
      return error.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.authdata = action.payload;
      })
      .addCase(logoutAuth.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.authdata = action.payload;
        state.userfulldata = null;
      })
      .addCase(userGetData.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.userfulldata = action.payload;
      })
      .addCase(getCountryDetails.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.countryDetails = action.payload;
      });
  },
});

export default authSlice.reducer;

export const userDetails = (state) => state.auth.authdata;
export const userGetFullDetails = (state) => state.auth.userfulldata;
