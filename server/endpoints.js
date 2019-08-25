const apiPrefix = `/api`;

const authorizationKey = 'Cryptocritic_token';

const login = {
    path: `/user/login`,
    tittle: 'Login',
    icon: 'fas fa-sign-in-alt',
    component: 'containers/Login',
    accessRoles: ['non-user'],
    redirectPath: '/404',
    secondaryPath: '/users/me',
};

const register = {
    path: `/user/register`,
    tittle: 'Register',
    icon: 'user-add',
    component: 'containers/Register',
    accessRoles: ['non-user'],
    redirectPath: '/404',
    secondaryPath: '/users/login',
};

const home = {
    path: `/`,
    tittle: 'Home Page',
    icon: 'home',
    component: 'containers/HomePage',
    accessRoles: ['non-user', 'user', 'coin-owner', 'admin'],
    redirectPath: '',
    secondaryPath: '',
};

const coin = {
    path: '/coin/:id',
    tittle: 'Coin Info',
    icon: 'fas fa-coins',
    component: 'containers/HomePage',
    accessRoles: ['non-user', 'user', 'coin-owner', 'admin'],
    redirectPath: '/',
};

const explorer = {
    path: '/explorer/:id',
    icon: 'search',
    redirectPath: '/',
    tittle: 'Explorer',
    accessRoles: ['non-user', 'user', 'coin-owner', 'admin'],
    redirectPath: '/',
};

const userInfo = {
    path: `/user/info`,
    tittle: 'User Info',
    icon: 'user',
    component: 'containers/UserInfo',
    accessRoles: ['user', 'coin-owner', 'admin'],
    redirectPath: '/404',
    secondaryPath: '/users/login',
};

const userWalletManagement = {
    path: '/user/wallet',
    tittle: 'Wallet Management',
    icon: 'wallet',
    component: 'containers/UserWalletManagement',
    redirectPath: '/login',
    accessRoles: ['user', 'coin-owner', 'admin'],
    createWalletPath: 'user/wallet/create-wallet',
    deleteWalletPath: 'user/wallet/delete-wallet'
};

const userEditor = {
    path: '/user/edit',
    tittle: 'Edit Profile',
    icon: 'edit',
    component: 'containers/UserEditor',
    redirectPath: '/login',
    accessRoles: ['user', 'coin-owner', 'admin'],
};

const userTransfer = {
    path: '/user/transfer',
    tittle: 'Transfer',
    icon: 'fas fa-share-square',
    component: 'containers/UserEditor',
    redirectPath: '/login',
    accessRoles: ['user', 'coin-owner', 'admin'],
};

const userWithdraw = {
    path: '/user/withdraw',
    tittle: 'Withdrawal',
    icon: 'wallet',
    component: 'containers/UserWithdraw',
    redirectPath: '/login',
    accessRoles: ['user', 'coin-owner', 'admin'],
};

const userHistory = {
    path: '/user/history',
    tittle: 'History',
    icon: 'history',
    component: 'containers/UserHistory',
    redirectPath: '/login',
    accessRoles: ['user', 'coin-owner', 'admin'],
};

const userEvent = {
    path: '/user/event',
    tittle: 'User Event',
    icon: 'far fa-calendar-alt',
    component: 'containers/UserEvent',
    redirectPath: '/login',
    accessRoles: ['user', 'coin-owner', 'admin'],
};

const createEvent = {
    path: '/user/create-event',
    tittle: 'Create Event',
    icon: 'far fa-calendar-plus',
    component: 'containers/CreateEvent',
    redirectPath: '/login',
    accessRoles: ['coin-owner', 'admin'],
};

module.exports = {
    apiPrefix,
    authorizationKey,
    login,
    register,
    home,
    coin,
    explorer,
    userInfo,
    userWalletManagement,
    userEditor,
    userHistory,
    userTransfer,
    userEvent,
    userWithdraw,
    createEvent
}