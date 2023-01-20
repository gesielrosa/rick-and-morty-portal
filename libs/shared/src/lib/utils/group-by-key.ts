export function groupByKey(array: any[], key: string) {
  return array.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
