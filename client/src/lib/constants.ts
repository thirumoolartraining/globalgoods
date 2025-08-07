/**
 * Order quantity constants and helpers
 */

export const MINIMUM_ORDER_QUANTITY = 25; // 25kg MOQ
export const QUANTITY_INCREMENT = 5; // 5kg increments

/**
 * Validates if a quantity meets MOQ and increment requirements
 * @param quantity The quantity to validate
 * @returns boolean indicating if the quantity is valid
 */
export const isValidQuantity = (quantity: number): boolean => {
  return (
    quantity >= MINIMUM_ORDER_QUANTITY &&
    quantity % QUANTITY_INCREMENT === MINIMUM_ORDER_QUANTITY % QUANTITY_INCREMENT
  );
};

/**
 * Rounds a quantity to the nearest valid increment
 * @param quantity The quantity to round
 * @returns The nearest valid quantity
 */
export const roundToNearestIncrement = (quantity: number): number => {
  if (quantity < MINIMUM_ORDER_QUANTITY) {
    return MINIMUM_ORDER_QUANTITY;
  }
  return Math.round(quantity / QUANTITY_INCREMENT) * QUANTITY_INCREMENT;
};

/**
 * Gets the next valid quantity when incrementing or decrementing
 * @param currentQuantity The current quantity
 * @param direction 1 for increment, -1 for decrement
 * @returns The next valid quantity
 */
export const getNextValidQuantity = (currentQuantity: number, direction: 1 | -1): number => {
  const newQuantity = currentQuantity + (direction * QUANTITY_INCREMENT);
  return Math.max(MINIMUM_ORDER_QUANTITY, newQuantity);
};
