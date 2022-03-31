export default function ({ redirect }) {
  // If the user is not authenticated
  let parsed_token = "";

  if (process.browser) {
    const vuexLocal = window.localStorage.getItem("vuex");
    if (vuexLocal) {
      const parsed_store = JSON.parse(vuexLocal);
      if (parsed_store && parsed_store.auth) {
        parsed_token = parsed_store.auth.access_token;
        if (parsed_token) {
          return;
        }
      }
    }

    redirect("/");
  }
}
