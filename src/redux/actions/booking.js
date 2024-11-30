import { createAction } from "@reduxjs/toolkit";

const addBooking = createAction("addBooking");
const updateBooking = createAction("updateBooking");
const clearBooking = createAction("clearBooking");

export { addBooking, updateBooking, clearBooking };
