export const state = () => ({
  user: null,
  snackbar: { value: false, type: null, message: "" },
});
export const mutations = {
  setSnackbar: (state, payload) => {
    state.snackbar = payload;
  },
  setUser: (state, payload) => {
    if (payload?.id) state.user = payload;
    else state.user = null;
  },
};
