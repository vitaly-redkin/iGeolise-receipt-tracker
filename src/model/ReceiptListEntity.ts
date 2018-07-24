/**
 * Class to hold the list of recepts.
 */

import { BaseEntityWithAmountList } from './BaseEntityWithAmountList';
import { EntityId } from './EntityId';
import { ReceiptEntity } from './ReceiptEntity';

export class ReceiptListEntity extends BaseEntityWithAmountList<ReceiptEntity> {
  /**
   * Constructor.
   * @param id ID of the receipt
   * @param expenseType Type of the expense the receipt covers
   */
  constructor() {
    super(EntityId.CREATE_FOR_STRING());
  }

}
