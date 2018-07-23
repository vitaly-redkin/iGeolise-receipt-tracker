/**
 * Class to hold the list of recepts.
 */

import { BaseEntityWithAmountList } from "./BaseEntityWithAmountList";
import { EntityId } from "./EntityId";
import { Receipt } from "./Receipt";

export class ReceiptList extends BaseEntityWithAmountList<Receipt, string> {
  /**
   * Constructor.
   * @param id ID of the receipt
   * @param expenseType Type of the expense the receipt covers
   */
  constructor(
    public readonly id: EntityId<string>) {
    super(id);
    this.recalculateSummary();
  }
}