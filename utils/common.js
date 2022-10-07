/*
 * @Description: 
 * @Date: 2022-10-07 18:04:50
 * @LastEditTime: 2022-10-07 18:04:53
 */
export const queryParamFromUrlStr = function(url, key = '') {
    const urlAry = url.split('?');
    if (urlAry && urlAry.length > 1) {
      const paramStr = urlAry[1] || '';
      const paramAry = paramStr.split('&');
      let o = {};
      paramAry.map(s => {
        const l = s.split('=');
        o[l[0]] = l[1];
      });
      if (key) {
        return o[key] || '';
      }
      return o;
  
    }
    return '';
  };