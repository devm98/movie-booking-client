function roundNumberV2(num, scale) {
  if (Math.round(num) !== num) {
    if (Math.pow(0.1, scale) > num) {
      return 0;
    }
    let sign = Math.sign(num);
    let arr = ('' + Math.abs(num)).split('.');
    if (arr.length > 1) {
      if (arr[1].length > scale) {
        let integ = +arr[0] * Math.pow(10, scale);
        let dec = integ + (+arr[1].slice(0, scale) + Math.pow(10, scale));
        let proc = +arr[1].slice(scale, scale + 1);
        if (proc >= 5) {
          dec = dec + 1;
        }
        dec = (sign * (dec - Math.pow(10, scale))) / Math.pow(10, scale);
        return dec;
      }
    }
  }
  return num;
}

export const exchangeMoney = (money) => {
  let newMoney = Number(money) / 23067;

  return roundNumberV2(newMoney, 2);
};
