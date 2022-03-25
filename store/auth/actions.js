import HttpClient from "../../utils/httpClient";
import { auth, GoogleProvider } from "../../services/firebase";

export default {
  async loginWithEmailAndPassword({ commit }, { email, password }) {
    let error;
    try {
      const firebaseRes = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const idToken = await auth.currentUser.getIdToken();
      await HttpClient.call({
        url: "/auth",
        method: "POST",
        data: {
          uid: firebaseRes.user.uid,
          email,
          channel: "email",
          access_token: idToken,
        },
      });
    } catch (err) {
      console.log(err);
      error = err;
    }

    return error;
  },
  async registerWithEmailAndPassword({ commit }, { name, email, password }) {
    let error;

    try {
      const firebaseRes = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const idToken = await auth.currentUser.getIdToken();
      await HttpClient.call({
        url: "/auth",
        method: "POST",
        data: {
          uid: firebaseRes.user.uid,
          email,
          fullname: name,
          channel: "email",
          access_token: idToken,
        },
      });
    } catch (err) {
      console.log(err);
      error = err;
    }

    return error;
  },
  async signInWithGoogle({ commit }) {
    let error;

    try {
      await auth.signOut();
      const firebaseRes = await auth.signInWithPopup(GoogleProvider);
      const idToken = await auth.currentUser.getIdToken();
      await HttpClient.call({
        url: "/auth",
        method: "POST",
        data: {
          uid: firebaseRes.user.uid,
          email: firebaseRes.user.email,
          fullname: firebaseRes.user.displayName,
          channel: "email",
          access_token: idToken,
        },
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
};
