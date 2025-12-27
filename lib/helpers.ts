export function formatToPHP(price: number) {
  let format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });
  return format.format(price);
}
