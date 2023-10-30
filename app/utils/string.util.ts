export const convertToMoney = (value: number): string => {
  const formatedValue = value.toFixed(2).toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${formatedValue}`;
}