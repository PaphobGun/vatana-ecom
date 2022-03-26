import HttpClient from "../../utils/httpClient";
import { auth, GoogleProvider } from "../../services/firebase";

export default {
  async loginWithEmailAndPassword(
    { commit, dispatch },
    { email, password, isRemember }
  ) {
    let error;
    try {
      const firebaseRes = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const idToken = await auth.currentUser.getIdToken();
      await dispatch("getAccessToken", {
        uid: firebaseRes.user.uid,
        email,
        channel: "email",
        access_token: idToken,
      });
      if (isRemember) {
        commit("SET_EMAIL_INPUT", email);
      } else {
        commit("SET_EMAIL_INPUT", "");
      }
    } catch (err) {
      console.log(err);
      error = err;
    }

    return error;
  },
  async registerWithEmailAndPassword({ dispatch }, { name, email, password }) {
    let error;

    try {
      const firebaseRes = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const idToken = await auth.currentUser.getIdToken();
      await dispatch("getAccessToken", {
        uid: firebaseRes.user.uid,
        fullname: name,
        email,
        channel: "email",
        access_token: idToken,
      });
    } catch (err) {
      console.log(err);
      error = err;
    }

    return error;
  },
  async signInWithGoogle({ dispatch }) {
    let error;

    try {
      await auth.signOut();
      const firebaseRes = await auth.signInWithPopup(GoogleProvider);
      const idToken = await auth.currentUser.getIdToken();
      await dispatch("getAccessToken", {
        uid: firebaseRes.user.uid,
        email: firebaseRes.user.email,
        fullname: firebaseRes.user.displayName,
        channel: "google",
        access_token: idToken,
      });
    } catch (err) {
      console.log(err);
      error = err;
    }

    return error;
  },
  async requestResetPassword({ commit }, email) {
    let error;

    try {
      await auth.sendPasswordResetEmail(email);
    } catch (err) {
      console.log(err);
      error = err;
    }

    return error;
  },
  async resetPassword(_, { oobCode, password }) {
    let error;

    try {
      await auth.verifyPasswordResetCode(oobCode);
      await auth.confirmPasswordReset(oobCode, password);
    } catch (err) {
      console.log(err);
      error = err;
    }

    return error;
  },
  async getAccessToken(
    { commit },
    { uid, email, fullname, channel, access_token }
  ) {
    let error;

    try {
      const res = await HttpClient.call({
        url: "/auth",
        method: "POST",
        data: {
          uid,
          email,
          fullname,
          channel,
          access_token,
        },
      });

      commit("SET_ACCESS_TOKEN", res.token);
      commit("SET_REFRESH_TOKEN", res.refresh_token);
    } catch (err) {
      console.log(err);
      error = err;
    }

    return error;
  },
  async signOut({ commit }) {
    await auth.signOut();
    commit("SET_ACCESS_TOKEN", null);
    commit("SET_REFRESH_TOKEN", null);
  },
};
