/*
 * @Description: 
 * @Date: 2022-10-07 17:09:28
 * @LastEditTime: 2022-10-07 17:09:33
 */
import Vue from 'vue';
import moment from 'moment';
import accounting from 'accounting-js';
// import numberal from 'numeral'
import _ from 'lodash';
// import vueNumeralFilterInstaller from 'vue-numeral-filter'

// Vue.use(vueNumeralFilterInstaller)
Vue.filter('formatTime', (time) => {
  if (time == null) {
    return '';
  }
  const date = new Date(time);
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
});
Vue.filter('formatMoney2', (money, currencySign) => {
  if (money !== undefined && money !== null && money !== '') {
    return accounting.formatMoney(money, _.isString(currencySign) ? currencySign : '');
  }
  return '-';
});

Vue.filter('formatMoney', (money, currencySign) => {
  if (money !== undefined && money !== null && money !== '') {
    return accounting.formatMoney(money, _.isString(currencySign) ? currencySign : '');
  }
  return '';
});

Vue.filter('formatDate2', (time) => {
  if (time === undefined || time === null || time === '' || time === 0) {
    return '';
  }
  const date = new Date(time);
  return moment(date).format('YYYY-MM-DD');
});

Vue.filter('formatText', (text) => {
  if (text !== undefined && text !== null && text !== '') {
    return text;
  }
  return '-';
});

Vue.filter('formatDate', (time) => {
  if (!time) {
    return '';
  }
  const date = new Date(time);
  return moment(date).format('YYYY-MM-DD');
});

Vue.filter('percent', (val) => (val !== undefined && val !== null && val !== '' ? `${val}%` : val));

// Vue.filter('formatPercent', function (val) {
//   if (val !== undefined && val !== null && val !== '') {
//     return numberal(val).format('0.00%')
//   } else {
//     return ''
//   }
// })

Vue.filter('formatNumber', (val, precision) => accounting.formatNumber(val, { precision }));

Vue.filter('emptyPlacehoder', (val) =>
  val === '' || val === undefined || val == null ? '-' : val,
);
Vue.filter('formatNumber', (val) => accounting.formatNumber(val));

Vue.filter('emptyPlacehoder', (val) =>
  val === '' || val === undefined || val == null ? '-' : val,
);

Vue.filter('percentSlice', (val) => {
  let num = val * 100;
  num += '%';
  return num;
});

Vue.filter('amountFixed', (val = 0) => Number(val).toFixed(2));

Vue.filter('fdassAuthPop', (code) => {
  const str = {
    fdass_prim_gopherpd: '定量初选',
    fdass_chosen_gopherpd: '定量精选',
    fdass_qualitative_gopherpd: '定性尽调评价',
    fdass_strategy_gopherpd: '战略池管理',
    fdass_tactics_gopherpd: '战术池管理',
    fdass_template_score: '评分模板配置',
    fdass_template_ddq: '问卷模板配置',
    fdass_tracking_pool_gp: '跟踪池管理',
  };
  return str[code];
});
