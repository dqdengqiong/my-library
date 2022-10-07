/*
 * @Description:表单数据格式化处理
 * @Author: deng.qiong
 * @Date: 2022-07-19 16:37:00
 */
// 将数字转换成金额格式， 参数s为数字，参数n为预留小数后几位
export const formatNumberToMoney = (s, n) => {
    if (s === null || s === undefined || s === '') {
      return null;
    }
  
    if (isNaN(s)) {
      return null;
    }
  
    let minusNumFlag = '';
    n = n > 0 && n <= 20 ? n : 2;
    s = `${parseFloat(`${s}`.replace(/[^\d\.-]/g, '')).toFixed(n)}`;
    if (s.substring(0, 1) === '-') {
      s = s.substring(1);
      minusNumFlag = '1';
    }
  
    const l = s.split('.')[0].split('').reverse();
    const r = s.split('.')[1];
    let t = '';
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
    }
  
    let result = `${t.split('').reverse().join('')}.${r}`;
    if (minusNumFlag === '1') {
      result = `-${result}`;
    }
    return result;
  };
  
  // 将金额格式转换为纯数字 参数s为金额值
  export const formatMoneyToNumber = (s) => {
    if (s === null || s === undefined || s === '') {
      return null;
    }
  
    if (isNaN(s)) {
      s = s.replace(/,/g, '');
    }
  
    if (isNaN(s)) {
      return null;
    }
    return parseFloat(s);
  };
  
  /** ******JS 精确计算 start******** */
  // 浮点数加法运算
  export const floatAdd = (arg1, arg2) => {
    if (!arg1 || !arg2) return arg1;
    let r1;
    let r2;
    try {
      r1 = arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0;
    } catch (e) {
      r2 = 0;
    }
    const m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  };
  
  // 浮点数减法运算
  export const floatSub = (arg1, arg2) => {
    if (!arg1 || !arg2) return arg1;
    let r1;
    let r2;
    try {
      r1 = arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0;
    } catch (e) {
      r2 = 0;
    }
    const m = Math.pow(10, Math.max(r1, r2));
    // 动态控制精度长度
    const n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  };
  
  // 浮点数乘法运算
  export const floatMul = (arg1, arg2) => {
    if (!arg1 || !arg2) return arg1;
    let m = 0;
    const s1 = arg1.toString();
    const s2 = arg2.toString();
    try {
      m += s1.split('.')[1] ? s1.split('.')[1].length : 0;
    } catch (e) {
      console.error(e);
    }
    try {
      m += s2.split('.')[1] ? s2.split('.')[1].length : 0;
    } catch (e) {
      console.error(e);
    }
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
  };
  
  // 浮点数除法运算
  export const floatDiv = (arg1, arg2) => {
    if (!arg1 || !arg2) return arg1;
    let t1 = 0;
    let t2 = 0;
    try {
      t1 = arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0;
    } catch (e) {
      console.error(e);
    }
    try {
      t2 = arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0;
    } catch (e) {
      console.error(e);
    }
  
    const r1 = Number(arg1.toString().replace('.', ''));
    const r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  };
  
  /** ******JS 精确计算 end******** */
  