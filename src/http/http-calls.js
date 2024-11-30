import { API_URL, GOOGLE_LOCATION_API_KEY } from "../config";
import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
  // uploadFile,
  // makeDeleteRequest,
  // uploadFileMultiPart
} from "./http-service";

const BASE_URL = API_URL;

export const registerUser = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/signup`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getLoctions = (query) => {
  return new Promise((resolve, reject) => {
    makeGetRequest(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_LOCATION_API_KEY}`,
      false
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getUserDetails = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/agent/website/detail`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const login = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/agent-website/login/token`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const sendOtp = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/agent-website/login/email`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

// export const updateProfile = (id, payload) => {
//   return new Promise((resolve, reject) => {
//     makePutRequest(`${BASE_URL}/update/user/${id}`, true, payload)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((e) => {
//         console.log("API call error>>", e);
//         reject(e);
//       });
//   });
// };

export const fetchBookedDates = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent-website/user/check/agent-availability`,
      false,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const forgotPassword = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/forgotpassword`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const resetPassword = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/resetpassword`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getCardToken = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/card-token`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const addCard = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/add-card`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const addDefaultCard = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/add-default-card`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const agentClientAddAndSetDefaultCard = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/agent/client/card`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const updateDefaultCard = (id, payload) => {
  return new Promise((resolve, reject) => {
    makePutRequest(`${BASE_URL}/set-default-card/${id}`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const deleteCard = (id, payload) => {
  return new Promise((resolve, reject) => {
    makePutRequest(`${BASE_URL}/delete-card/${id}`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getAllCards = () => {
  return new Promise((resolve, reject) => {
    makeGetRequest(`${BASE_URL}/all-cards`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const buySubscription = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/buy/subscription`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const renewSubscription = () => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/renew/subscription`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const pauseSubscription = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/pause/subscription`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

/**
 * @param {string} platform - google or facebook
 * @param {object} payload - {accessToken: google or facefook response token}
 * @returns
 */
export const socialLogin = (platform, payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/${platform}/signup`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

/**
 * used for check availability of phone or email or username
 *
 * @param {string} payload - phone or email or username
 * @returns
 */
export const checkAvailability = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/unique`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getLoggedInUserDetail = () => {
  return new Promise((resolve, reject) => {
    makeGetRequest(`${BASE_URL}/user`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getDetailsWithEmail = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent-website/user/get/user-details`,
      false,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const sendOtpEmailForBooking = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent-website/user/get/verify-email`,
      false,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const verificationForBooking = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent-website/user/send/verify-email/code`,
      false,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const createBooking = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent-website/user/create/closing`,
      false,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getAllBookings = (agentId, payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/agent-website/user/get/closings`, true, {
      agentId,
      ...payload,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getChats = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent-website/user/get/closing/chatlogs`,
      true,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const postChat = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent-website/user/create/closing/chatlog`,
      true,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const updateChat = (id, payload) => {
  return new Promise((resolve, reject) => {
    makePutRequest(
      `${BASE_URL}/agent-website/user/update/closing/chatlog/${id}`,
      true,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const deleteChat = ({ id }) => {
  return new Promise((resolve, reject) => {
    makeDeleteRequest(
      `${BASE_URL}/agent-website/user/delete/closing/chatlog/${id}`,
      true
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const updateProfile = (payload) => {
  return new Promise((resolve, reject) => {
    makePutRequest(
      `${BASE_URL}/agent-website/user/update/profile`,
      true,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getStandardFees = (agentId) => {
  return new Promise((resolve, reject) => {
    makeGetRequest(
      `${BASE_URL}/agent-website/user/standardfees/details/${agentId}`,
      false
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getOtherAgents = (id, payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent/website/foward-agent/detail/${id}`,
      false,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const bidOtherAgents = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent-website/user/send/bid/closing/agents`,
      false,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getBookingDetails = (closingId, agentId) => {
  return new Promise((resolve, reject) => {
    makeGetRequest(
      `${BASE_URL}/agent-website/user/get/unassign/closing-counter-bidding/amount/${closingId}?agentid=${agentId}`,
      false
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const updateBookingBid = (id, payload) => {
  return new Promise((resolve, reject) => {
    makePutRequest(
      `${BASE_URL}/agent-website/user/update/unassign/closing/${id}`,
      false,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const checkAvailabilityForOwner = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${BASE_URL}/agent-website/user/check/website-owner/availability`,
      false,
      payload
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const submitContactForm = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/send/inquiry-email-to/agent`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const fetchGoogleRating = (id) => {
  return new Promise((resolve, reject) => {
    makeGetRequest(`${BASE_URL}/fetch/google-rating/${id} `, false)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getIsClosingPaid = (id) => {
  return new Promise((resolve, reject) => {
    makeGetRequest(
      `${BASE_URL}/agent-website/client/require/payment/${id} `,
      false
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};
