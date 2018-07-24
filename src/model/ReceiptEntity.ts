/**
 * Class to hold the recept data.
 */

import { BaseEntityWithAmountList } from './BaseEntityWithAmountList';
import { EntityId } from './EntityId';
import { IEntityWithIdAndAmount } from './IEntityWithIdAndAmount';
import { ReceiptLineEntity } from './ReceiptLineEntity';

export class ReceiptEntity extends BaseEntityWithAmountList<ReceiptLineEntity>
  implements IEntityWithIdAndAmount {

  /**
   * Constructor.
   * @param id ID of the receipt
   * @param expenseType Type of the expense the receipt covers
   * @param amount Receipt total amount
   */
  constructor(
    public readonly id: EntityId<string>,
    public readonly expenseType: string,
    public readonly amount: number = 0) {
    super(id);
  }
}
