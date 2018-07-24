/**
 * Module to contain the application-wide constants.
 */

export module Consts {
  /**
   * List of availble expense types.
   */
  export const EXPENSE_TYPES: string[] = ['Food', 'Houseware', 'Entertainment'];

  /**
   * Default expense type.
   */
  export const DEFAULT_EXPENSE_TYPE: string = EXPENSE_TYPES[0];

  /**
   * Currency suffix (strng to show after currency amounts).
   */
  export const CURRENCY_SUFFIX: string = ' €';
}
