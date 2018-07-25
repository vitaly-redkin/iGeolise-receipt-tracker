/**
 * Module to contain the application-wide utility functions.
 */

import * as Numeral from 'numeral';
import {Consts} from './Consts';

export module Utils {
  /**
   * Formats total value.
   * If value is 0 just return 0.
   *
   * @param value Total value to format
   */
  export function formatTotal(value: number): string {
    return (value === 0 ? '0' : Numeral(value).format('0,0.00')) + Consts.CURRENCY_SUFFIX;
  }
}
