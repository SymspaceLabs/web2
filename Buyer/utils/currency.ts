import currencyJs from "currency.js";
import { formatDistanceStrict } from "date-fns";

/**
 * GET THE DIFFERENCE DATE FORMAT
 * @param date - DATE | NUMBER | STRING
 * @returns FORMATTED DATE STRING
 */
export function getDateDifference(date: Date | number | string): string {
  const distance = formatDistanceStrict(new Date(), new Date(date));
  return distance + " ago";
}

/**
 * RENDER THE PRODUCT PAGINATION INFO
 * @param page - CURRENT PAGE NUMBER
 * @param perPageProduct - PER PAGE PRODUCT LIST
 * @param totalProduct - TOTAL PRODUCT NUMBER
 * @returns
 */
export function renderProductCount(
  page: number,
  perPageProduct: number,
  totalProduct: number
): string {
  let startNumber = (page - 1) * perPageProduct + 1;
  let endNumber = page * perPageProduct;

  if (endNumber > totalProduct) {
    endNumber = totalProduct;
  }

  return `Showing ${startNumber}-${endNumber} of ${totalProduct} products`;
}

/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param price - PRODUCT PRICE
 * @param discount - DISCOUNT PERCENT
 * @returns - RETURN NEW PRICE
 */
export function calculateDiscount(price: number, discount: number): string {
  const afterDiscount = Number((price - price * (discount / 100)).toFixed(2));
  return currency(afterDiscount);
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param price - PRODUCT PRICE
 * @param fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */
export function currency(price: number, fraction: number = 2): string {
  const formatCurrency = currencyJs(price).format({
    precision: fraction,
  });
  return formatCurrency;
}