export const siteName = 'Crypto Critic'
export const copyright = 'Crypto Critic ©2019 pinokara'
export const logoPath = '../../assets/img/logo.svg'
export const languageDefinition = {
  /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
  languages: [
    {
      languageKey: 'en',
      title: 'English',
      flag: '../../assets/img/flags/us.svg',
    },
    {
      languageKey: 'vi',
      title: 'Tiếng Việt',
      flag: '../../assets/img/flags/vi.svg',
    },
    {
      languageKey: 'jp',
      title: '日本語',
      flag: '../../assets/img/flags/jp.svg',
    },
  ],
  defaultLanguage: 'en',
}
export const moneyDefinition = {
  defaultMoney: 'USD',
  moneys: [
    'USD',
    'VND',
    'BTC',
    'JPY'
  ]
}
export const themeDefinition = {
  defaultTheme: 'day',
  themes: [
    'day',
    'night'
  ]
}

export const appConfig = {
	host: 'localhost',
	// host: '125.212.239.134',
	port: 3030,
	token: {
		minValidity: 5
	},
};

export const authConfig = {
	storageKey: 'accesstoken',
	cookie: 'accesstoken',
	storage: localStorage,
};
