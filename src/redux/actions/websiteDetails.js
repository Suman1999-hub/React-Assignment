import { createAction } from "@reduxjs/toolkit";

const updateDetails = createAction("updateDetails");
const clearDetails = createAction("clearDetails");

export { updateDetails, clearDetails };
