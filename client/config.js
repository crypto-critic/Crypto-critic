// export const siteName = 'Crypto Critic';
// export const copyright = 'Crypto Critic ©2019 pinokara';
// export const logoPath = '/logo.svg';
// export const languageDefinition = {
//   /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
//   languages: [
//     {
//       key: 'en_US',
//       linguiKey: 'en',
//       title: 'English',
//       flag: 'assets/img/flags/us.svg',
//     },
//     {
//       key: 'vi_VN',
//       linguiKey: 'vi',
//       title: 'Tiếng Việt',
//       flag: 'assets/img/flags/vi.svg',
//     },
//   ],
//   defaultLanguage: 'en_US',
// }
// export const moneyDefinition = {
//   defaultMoney: 'usd',
//   moneys: [
//     'usd',
//     'vnd'
//   ]
// }
// export const themeDefinition = {
//   defaultTheme: 'day',
//   themes: [
//     'day',
//     'night'
//   ]
// }

module.exports = {
  siteName: 'Crypto Critic',
  copyright: 'Crypto Critic ©2019 pinokara',
  logoPath: '/logo.svg',
  languageDefinition: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        localeProviderKey: 'en_US',
        linguiKey: 'en',
        title: 'English',
        flag: 'assets/img/flags/us.svg',
      },
      {
        localeProviderKey: 'vi_VN',
        linguiKey: 'vi',
        title: 'Tiếng Việt',
        flag: 'assets/img/flags/vi.svg',
      },
    ],
    defaultLanguage: 'en',
  },
  moneyDefinition: {
    defaultMoney: 'usd',
    moneys: [
      'usd',
      'vnd',
      'btc',
      'jpy'
    ]
  },
  themeDefinition: {
    defaultTheme: 'day',
    themes: [
      'day',
      'night'
    ]
  }
}
