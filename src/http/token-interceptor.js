import { store } from "../redux/store";

export const getToken = () => {
  return new Promise((resolve, reject) => {
    let token = null;

    const { userCredentialReducer } = store.getState();

    if (userCredentialReducer?.token) {
      token = userCredentialReducer.token;
    }

    resolve(token);
  });
};
