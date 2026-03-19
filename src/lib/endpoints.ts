export const endpoints = {
  GET_NONCE: "/auth/nonce",
  POST_VERIFY: "/auth/verify",
  GET_ME: "/auth/me",

  GET_USER_BY_ADDRESS: (address: string) => `/users/${address}`,
  USER: "/users/me",

  PREFERENCES: "/preferences",

  POST_TIPS: "/tips",
  GET_TIPS_SENT: "/tips/sent",
  GET_TIPS_RECEIVED: "/tips/received",
  GET_TIPS_BY_ID: (id: string) => `/tips/${id}`,

  POST_WITHDRAWALS: "/withdrawals",
  GET_WITHDRAWALS_HISTORY: "/withdrawals/history",
  GET_WITHDRAWALS_BY_ID: (id: string) => `/withdrawals/${id}`,

  COIN_GECKO_ID: (id: string) =>
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
};
