import { CurrencyVM } from "./App";

export const filterPricesByDate = (data: CurrencyVM[]) => {
  const filteredData = data.reduce<{ [key: string]: (typeof data)[0] }>(
    (accumulator, currentItem) => {
      const currency = currentItem.currency;
      const date = new Date(currentItem.date).getTime();

      //check is exsited currency in accumulator
      if (
        !accumulator[currency] ||
        date > new Date(accumulator[currency].date).getTime()
      ) {
        accumulator[currency] = currentItem;
      }

      return accumulator;
    },
    {}
  );

  return Object.values(filteredData);
};

export const calculatorPrice = (
  from: number,
  price: number,
  toPrice: number
): string => {
  if (from <= 0) {
    return "";
  }

  return ((from * price) / toPrice)?.toString() || "";
};
