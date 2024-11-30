import { createAction } from "@reduxjs/toolkit";

const showLoader = createAction("showLoader");
const hideLoader = createAction("hideLoader");

export { showLoader, hideLoader };
