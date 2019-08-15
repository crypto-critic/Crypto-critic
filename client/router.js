/*
0: anonymous user
1: user
2: coin owner
3: admin
*/

export default {
    home: {
        path: "/",
        redirectPath: "",
        tittle: "Home Page",
        accessRoles: [0, 1, 2, 3]
    },
    login: {
        path: "/login",
        redirectPath: "/",
        tittle: "Login",
        accessRoles: [0]
    },
    registration: {
        path: "/registration",
        redirectPath: "/",
        tittle: "Registration",
        accessRoles: [0]
    },
    coin: {
        path: "/coin/:id",
        redirectPath: "/",
        tittle: "Coin Info",
        accessRoles: [0, 1, 2, 3]
    },
    explorer: {
        path: "/explorer/:id",
        redirectPath: "/",
        tittle: "Explorer",
        accessRoles: [0, 1, 2, 3]
    },
    userInfo: {
        path: "/user/me",
        redirectPath: "/login",
        tittle: "User Info",
        accessRoles: [1, 2, 3]
    },
    userWalletManagement: {
        path: "/user/wallet",
        redirectPath: "/login",
        tittle: "Wallet Management",
        accessRoles: [1, 2, 3]
    },
    userEditor: {
        path: "/user/edit",
        redirectPath: "/login",
        tittle: "Edit Profile",
        accessRoles: [1, 2, 3]
    },
    userTransfer: {
        path: "/user/transfer",
        redirectPath: "/login",
        tittle: "Transfer",
        accessRoles: [1, 2, 3]
    },
    userWithdraw: {
        path: "/user/withdraw",
        redirectPath: "/login",
        tittle: "Withdrawal",
        accessRoles: [1, 2, 3]
    },
    userHistory: {
        path: "/user/history",
        redirectPath: "/login",
        tittle: "History",
        accessRoles: [1, 2, 3]
    },
    userEvent: {
        path: "/user/event",
        redirectPath: "/login",
        tittle: "User Event",
        accessRoles: [1, 2, 3]
    },
    createEvent: {
        path: "/user/create-event",
        redirectPath: "/login",
        tittle: "User Event",
        accessRoles: [2, 3]
    },
}