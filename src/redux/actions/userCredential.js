import { createAction } from "@reduxjs/toolkit";

const addUserCredential = createAction("addUserCredential");
const updateUserData = createAction("updateUserData");
const clearUserCredential = createAction("clearUserCredential");

export { addUserCredential, updateUserData, clearUserCredential };
