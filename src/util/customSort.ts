import ProductType from "../interfaces/ProductType";

export const sortBy = (key: string, digit: number) => {
  return function (a: object, b: object) {
    if (a[key] < b[key]) {
      return 1 * digit;
    } else if (a[key] > b[key]) {
      return -1 * digit;
    } else {
      return 0;
    }
  };
};

export const sortByRatings = (key: string) => {
  return function (a: object, b: object) {
    if (a[key].rate < b[key].rate) {
      return -1;
    } else if (a[key].rate > b[key].rate) {
      return 1;
    } else {
      return 0;
    }
  };
};
