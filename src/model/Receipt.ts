/**
 * Class to hold the recept data.
 */

import { BaseEntityWithAmountList } from "./BaseEntityWithAmountList";
import { EntityId } from "./EntityId";
import { IEntityWithAmount } from "./IEntityWithAmount";
import { ReceiptLine } from "./ReceiptLine";

export class Receipt extends BaseEntityWithAmountList<ReceiptLine, string> 
  implements IEntityWithAmount {
  /**
   * Returns receipt amount.
   */
  public get amount(): number {
    return this._summary.sum;
  }

  /**
   * Constructor.
   * @param id ID of the receipt
   * @param expenseType Type of the expense the receipt covers
   */
  constructor(
    public readonly id: EntityId<string>,
    public readonly expenseType: string) {
    super(id);
    this.recalculateSummary();
  }

  /**
   * Adds new empty line to the receipt.
   * 
   * @returns Added line
   */
  public addLine(): ReceiptLine {
    const receiptLine = new ReceiptLine(EntityId.createForString(), "", 0);
    return super.add(receiptLine);
  }

  /**
   * Updates receipt line.
   * Searches for the existing line with the same ID.
   * If not found returns null.
   * If found but both name and amount are the same returns an existing receipt line.
   * If either name or amount are different replaces the receipt line with the new one
   * and returns the object passed as a parameter.
   * 
   * @param receiptLine Object with new line data
   */
  public updateLine(receiptLine: ReceiptLine): ReceiptLine | null {
    const index = this.list.findIndex((item) => item.id.id === receiptLine.id.id);
    if (index === -1) return null;

    const lineToUpdate = this.list[index];
    if (lineToUpdate.name === receiptLine.name && 
        lineToUpdate.amount === receiptLine.amount) {
      return lineToUpdate;
    }
    else
    {
      this.list[index] = receiptLine;
      this.recalculateSummary();
      return receiptLine;
    }
  }
}