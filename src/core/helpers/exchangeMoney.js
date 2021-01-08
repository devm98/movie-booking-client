export const exchangeMoney = (money) => {
  let newMoney = Number(money) / 23.067;

  return Math.round(newMoney) / 100;
};
