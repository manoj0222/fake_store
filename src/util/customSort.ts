export const sortBy = (key: string, digit: number) => {
  return function (a: Record<string, any>, b: Record<string, any>) {
    if (a[key] && b[key]) {
      if (a[key] < b[key]) {
        return 1 * digit;
      } else if (a[key] > b[key]) {
        return -1 * digit;
      } else {
        return 0;
      }
    } else {
      return 0; // Handle cases where key might not exist on one or both objects
    }
  };
};

export const sortByRatings = (key: string) => {
  return function (a: Record<string, any>, b: Record<string, any>) {
    if (a[key] && b[key] && a[key].rate && b[key].rate) {
      if (a[key].rate < b[key].rate) {
        return -1;
      } else if (a[key].rate > b[key].rate) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0; // Handle cases where key or rate might not exist on one or both objects
    }
  };
};
