
const axios = require('axios');
var loadData = () => new Promise((res, rej)=>{
  const url = '/api/coins/LGS';
  axios.get(url).then((a)=>{
    // console.log(a);
    res(a.data.map(item => {
      return {
                id :  item.id,
                name :  item.basedata.name,
                price: {
                  BTC : item.marketdata.price.BTC,
                  USD : item.marketdata.price.USD,
                  AUD : item.marketdata.price.AUD,
                  BGN : item.marketdata.price.BGN,
                  BRL : item.marketdata.price.BRL,
                  CAD : item.marketdata.price.CAD,
                  CHF : item.marketdata.price.CHF,
                  CNY : item.marketdata.price.CNY,
                  CZK : item.marketdata.price.CZK,
                  EUR : item.marketdata.price.EUR,
                  JPY : item.marketdata.price.JPY,
                  KRW : item.marketdata.price.KRW,
                  VND : item.marketdata.price.VND,
                  RUB : item.marketdata.price.RUB,
                },
                change : item.marketdata.change,
                volume : { 
                  BTC : item.marketdata.volume.BTC,
                  USD : item.marketdata.volume.USD,
                  AUD : item.marketdata.volume.AUD,
                  BGN : item.marketdata.volume.BGN,
                  BRL : item.marketdata.volume.BRL,
                  CAD : item.marketdata.volume.CAD,
                  CHF : item.marketdata.volume.CHF,
                  CNY : item.marketdata.volume.CNY,
                  CZK : item.marketdata.volume.CZK,
                  EUR : item.marketdata.volume.EUR,
                  JPY : item.marketdata.volume.JPY,
                  KRW : item.marketdata.volume.KRW,
                  VND : item.marketdata.volume.VND,
                  RUB : item.marketdata.volume.RUB,
                },
                marketcap : {
                  BTC : item.marketdata.marketcap.BTC,
                  USD : item.marketdata.marketcap.USD,
                  AUD : item.marketdata.marketcap.AUD,
                  BGN : item.marketdata.marketcap.BGN,
                  BRL : item.marketdata.marketcap.BRL,
                  CAD : item.marketdata.marketcap.CAD,
                  CHF : item.marketdata.marketcap.CHF,
                  CNY : item.marketdata.marketcap.CNY,
                  CZK : item.marketdata.marketcap.CZK,
                  EUR : item.marketdata.marketcap.EUR,
                  JPY : item.marketdata.marketcap.JPY,
                  KRW : item.marketdata.marketcap.KRW,
                  VND : item.marketdata.marketcap.VND,
                  RUB : item.marketdata.marketcap.RUB,
                },
                roi : item.incomedata.roi,
                mncount : item.explorerdata.mncount,
                totalvote: item.totalvote,
                votestate: item.votestate,
                dailyincome: {
                  coin: item.incomedata.dailyincome.coin.toFixed(4),
                  BTC: item.incomedata.dailyincome.BTC.toFixed(8),
                  USD: item.incomedata.dailyincome.USD.toFixed(4),
                  AUD: item.incomedata.dailyincome.AUD.toFixed(4),
                  BGN: item.incomedata.dailyincome.BGN.toFixed(4),
                  BRL: item.incomedata.dailyincome.BRL.toFixed(4),
                  CAD: item.incomedata.dailyincome.CAD.toFixed(4),
                  CHF: item.incomedata.dailyincome.CHF.toFixed(4),
                  CNY: item.incomedata.dailyincome.CNY.toFixed(4),
                  CZK: item.incomedata.dailyincome.CZK.toFixed(4),
                  EUR: item.incomedata.dailyincome.EUR.toFixed(4),
                  JPY: item.incomedata.dailyincome.JPY.toFixed(4),
                  KRW: item.incomedata.dailyincome.KRW.toFixed(4),
                  VND: item.incomedata.dailyincome.VND.toFixed(4),
                  RUB: item.incomedata.dailyincome.RUB.toFixed(4),
                },
                weeklyincome: {
                  coin: item.incomedata.weeklyincome.coin.toFixed(4),
                  BTC: item.incomedata.weeklyincome.BTC.toFixed(8),
                  USD: item.incomedata.weeklyincome.USD.toFixed(4),
                  AUD: item.incomedata.weeklyincome.AUD.toFixed(4),
                  BGN: item.incomedata.weeklyincome.BGN.toFixed(4),
                  BRL: item.incomedata.weeklyincome.BRL.toFixed(4),
                  CAD: item.incomedata.weeklyincome.CAD.toFixed(4),
                  CHF: item.incomedata.weeklyincome.CHF.toFixed(4),
                  CNY: item.incomedata.weeklyincome.CNY.toFixed(4),
                  CZK: item.incomedata.weeklyincome.CZK.toFixed(4),
                  EUR: item.incomedata.weeklyincome.EUR.toFixed(4),
                  JPY: item.incomedata.weeklyincome.JPY.toFixed(4),
                  KRW: item.incomedata.weeklyincome.KRW.toFixed(4),
                  VND: item.incomedata.weeklyincome.VND.toFixed(4),
                  RUB: item.incomedata.weeklyincome.RUB.toFixed(4),
                },
                monthlyincome: {
                  coin: item.incomedata.monthlyincome.coin.toFixed(4),
                  BTC: item.incomedata.monthlyincome.BTC.toFixed(8),
                  USD: item.incomedata.monthlyincome.USD.toFixed(4),
                  AUD: item.incomedata.monthlyincome.AUD.toFixed(4),
                  BGN: item.incomedata.monthlyincome.BGN.toFixed(4),
                  BRL: item.incomedata.monthlyincome.BRL.toFixed(4),
                  CAD: item.incomedata.monthlyincome.CAD.toFixed(4),
                  CHF: item.incomedata.monthlyincome.CHF.toFixed(4),
                  CNY: item.incomedata.monthlyincome.CNY.toFixed(4),
                  CZK: item.incomedata.monthlyincome.CZK.toFixed(4),
                  EUR: item.incomedata.monthlyincome.EUR.toFixed(4),
                  JPY: item.incomedata.monthlyincome.JPY.toFixed(4),
                  KRW: item.incomedata.monthlyincome.KRW.toFixed(4),
                  VND: item.incomedata.monthlyincome.VND.toFixed(4),
                  RUB: item.incomedata.monthlyincome.RUB.toFixed(4),
                },
                yearlyincome: {
                  coin: item.incomedata.yearlyincome.coin.toFixed(4),
                  BTC: item.incomedata.yearlyincome.BTC.toFixed(8),
                  USD: item.incomedata.yearlyincome.USD.toFixed(4),
                  AUD: item.incomedata.yearlyincome.AUD.toFixed(4),
                  BGN: item.incomedata.yearlyincome.BGN.toFixed(4),
                  BRL: item.incomedata.yearlyincome.BRL.toFixed(4),
                  CAD: item.incomedata.yearlyincome.CAD.toFixed(4),
                  CHF: item.incomedata.yearlyincome.CHF.toFixed(4),
                  CNY: item.incomedata.yearlyincome.CNY.toFixed(4),
                  CZK: item.incomedata.yearlyincome.CZK.toFixed(4),
                  EUR: item.incomedata.yearlyincome.EUR.toFixed(4),
                  JPY: item.incomedata.yearlyincome.JPY.toFixed(4),
                  KRW: item.incomedata.yearlyincome.KRW.toFixed(4),
                  VND: item.incomedata.yearlyincome.VND.toFixed(4),
                  RUB: item.incomedata.yearlyincome.RUB.toFixed(4),
                }
      }
    }))
});
});

export default loadData;

// var loadData = async () => {
//     const url1 = '/api/coins/';
//     var a = await axios.get(url1);
//     var b = a.data.map(async (item) => {
//               return await {
//                   id :  item.id,
//                   name :  item.basedata.name,
//                   price: {
//                     BTC : item.marketdata.price.BTC,
//                     USD : item.marketdata.price.USD,
//                     AUD : item.marketdata.price.AUD,
//                     BGN : item.marketdata.price.BGN,
//                     BRL : item.marketdata.price.BRL,
//                     CAD : item.marketdata.price.CAD,
//                     CHF : item.marketdata.price.CHF,
//                     CNY : item.marketdata.price.CNY,
//                     CZK : item.marketdata.price.CZK,
//                     EUR : item.marketdata.price.EUR,
//                     JPY : item.marketdata.price.JPY,
//                     KRW : item.marketdata.price.KRW,
//                     VND : item.marketdata.price.VND,
//                     RUB : item.marketdata.price.RUB,
//                   },
//                   change : item.marketdata.change,
//                   volume : { 
//                     BTC : item.marketdata.volume.BTC,
//                     USD : item.marketdata.volume.USD,
//                     AUD : item.marketdata.volume.AUD,
//                     BGN : item.marketdata.volume.BGN,
//                     BRL : item.marketdata.volume.BRL,
//                     CAD : item.marketdata.volume.CAD,
//                     CHF : item.marketdata.volume.CHF,
//                     CNY : item.marketdata.volume.CNY,
//                     CZK : item.marketdata.volume.CZK,
//                     EUR : item.marketdata.volume.EUR,
//                     JPY : item.marketdata.volume.JPY,
//                     KRW : item.marketdata.volume.KRW,
//                     VND : item.marketdata.volume.VND,
//                     RUB : item.marketdata.volume.RUB,
//                   },
//                   marketcap : {
//                     BTC : item.marketdata.marketcap.BTC,
//                     USD : item.marketdata.marketcap.USD,
//                     AUD : item.marketdata.marketcap.AUD,
//                     BGN : item.marketdata.marketcap.BGN,
//                     BRL : item.marketdata.marketcap.BRL,
//                     CAD : item.marketdata.marketcap.CAD,
//                     CHF : item.marketdata.marketcap.CHF,
//                     CNY : item.marketdata.marketcap.CNY,
//                     CZK : item.marketdata.marketcap.CZK,
//                     EUR : item.marketdata.marketcap.EUR,
//                     JPY : item.marketdata.marketcap.JPY,
//                     KRW : item.marketdata.marketcap.KRW,
//                     VND : item.marketdata.marketcap.VND,
//                     RUB : item.marketdata.marketcap.RUB,
//                   },
//                   roi : item.incomedata.roi,
//                   mncount : item.explorerdata.mncount,
//                   totalvote: item.totalvote,
//                   votestate: item.votestate,
//                   dailyincome: {
//                     coin: item.incomedata.dailyincome.coin.toFixed(4),
//                     BTC: item.incomedata.dailyincome.BTC.toFixed(8),
//                     USD: item.incomedata.dailyincome.USD.toFixed(4),
//                     AUD: item.incomedata.dailyincome.AUD.toFixed(4),
//                     BGN: item.incomedata.dailyincome.BGN.toFixed(4),
//                     BRL: item.incomedata.dailyincome.BRL.toFixed(4),
//                     CAD: item.incomedata.dailyincome.CAD.toFixed(4),
//                     CHF: item.incomedata.dailyincome.CHF.toFixed(4),
//                     CNY: item.incomedata.dailyincome.CNY.toFixed(4),
//                     CZK: item.incomedata.dailyincome.CZK.toFixed(4),
//                     EUR: item.incomedata.dailyincome.EUR.toFixed(4),
//                     JPY: item.incomedata.dailyincome.JPY.toFixed(4),
//                     KRW: item.incomedata.dailyincome.KRW.toFixed(4),
//                     VND: item.incomedata.dailyincome.VND.toFixed(4),
//                     RUB: item.incomedata.dailyincome.RUB.toFixed(4),
//                   },
//                   weeklyincome: {
//                     coin: item.incomedata.weeklyincome.coin.toFixed(4),
//                     BTC: item.incomedata.weeklyincome.BTC.toFixed(8),
//                     USD: item.incomedata.weeklyincome.USD.toFixed(4),
//                     AUD: item.incomedata.weeklyincome.AUD.toFixed(4),
//                     BGN: item.incomedata.weeklyincome.BGN.toFixed(4),
//                     BRL: item.incomedata.weeklyincome.BRL.toFixed(4),
//                     CAD: item.incomedata.weeklyincome.CAD.toFixed(4),
//                     CHF: item.incomedata.weeklyincome.CHF.toFixed(4),
//                     CNY: item.incomedata.weeklyincome.CNY.toFixed(4),
//                     CZK: item.incomedata.weeklyincome.CZK.toFixed(4),
//                     EUR: item.incomedata.weeklyincome.EUR.toFixed(4),
//                     JPY: item.incomedata.weeklyincome.JPY.toFixed(4),
//                     KRW: item.incomedata.weeklyincome.KRW.toFixed(4),
//                     VND: item.incomedata.weeklyincome.VND.toFixed(4),
//                     RUB: item.incomedata.weeklyincome.RUB.toFixed(4),
//                   },
//                   monthlyincome: {
//                     coin: item.incomedata.monthlyincome.coin.toFixed(4),
//                     BTC: item.incomedata.monthlyincome.BTC.toFixed(8),
//                     USD: item.incomedata.monthlyincome.USD.toFixed(4),
//                     AUD: item.incomedata.monthlyincome.AUD.toFixed(4),
//                     BGN: item.incomedata.monthlyincome.BGN.toFixed(4),
//                     BRL: item.incomedata.monthlyincome.BRL.toFixed(4),
//                     CAD: item.incomedata.monthlyincome.CAD.toFixed(4),
//                     CHF: item.incomedata.monthlyincome.CHF.toFixed(4),
//                     CNY: item.incomedata.monthlyincome.CNY.toFixed(4),
//                     CZK: item.incomedata.monthlyincome.CZK.toFixed(4),
//                     EUR: item.incomedata.monthlyincome.EUR.toFixed(4),
//                     JPY: item.incomedata.monthlyincome.JPY.toFixed(4),
//                     KRW: item.incomedata.monthlyincome.KRW.toFixed(4),
//                     VND: item.incomedata.monthlyincome.VND.toFixed(4),
//                     RUB: item.incomedata.monthlyincome.RUB.toFixed(4),
//                   },
//                   yearlyincome: {
//                     coin: item.incomedata.yearlyincome.coin.toFixed(4),
//                     BTC: item.incomedata.yearlyincome.BTC.toFixed(8),
//                     USD: item.incomedata.yearlyincome.USD.toFixed(4),
//                     AUD: item.incomedata.yearlyincome.AUD.toFixed(4),
//                     BGN: item.incomedata.yearlyincome.BGN.toFixed(4),
//                     BRL: item.incomedata.yearlyincome.BRL.toFixed(4),
//                     CAD: item.incomedata.yearlyincome.CAD.toFixed(4),
//                     CHF: item.incomedata.yearlyincome.CHF.toFixed(4),
//                     CNY: item.incomedata.yearlyincome.CNY.toFixed(4),
//                     CZK: item.incomedata.yearlyincome.CZK.toFixed(4),
//                     EUR: item.incomedata.yearlyincome.EUR.toFixed(4),
//                     JPY: item.incomedata.yearlyincome.JPY.toFixed(4),
//                     KRW: item.incomedata.yearlyincome.KRW.toFixed(4),
//                     VND: item.incomedata.yearlyincome.VND.toFixed(4),
//                     RUB: item.incomedata.yearlyincome.RUB.toFixed(4),
//                   }
//               }
//           });
//     return b;
// };