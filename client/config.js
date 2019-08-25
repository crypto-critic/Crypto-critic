module.exports = {
  siteName: 'Crypto Critic',
  copyright: 'Crypto Critic ©2019 pinokara',
  logoPath: 'assets/img/logo.svg',
  languageDefinition: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        languageKey: 'en',
        title: 'English',
        flag: 'assets/img/flags/us.svg',
      },
      {
        languageKey: 'vi',
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
