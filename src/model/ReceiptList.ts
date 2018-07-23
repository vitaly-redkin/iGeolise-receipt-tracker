/**
 * Class to hold the list of recepts.
 */

import { BaseEntityWithAmountList } from "./BaseEntityWithAmountList";
import { EntityId } from "./EntityId";
import { Receipt } from "./Receipt";
import { ReceiptLine } from "./ReceiptLine";

export class ReceiptList extends BaseEntityWithAmountList<Receipt, string> {
  /**
   * Constructor.
   * @param id ID of the receipt
   * @param expenseType Type of the expense the receipt covers
   */
  constructor(
    public readonly id: EntityId<string> = EntityId.createForString()) {
    super(id);
    this.recalculateSummary();
  }

  /**
   * Adds new empty receipt to the list.
   * 
   * @returns Added receipt
   */
  public addReceipt(expenseType: string): Receipt {
    const receipt = new Receipt(EntityId.createForString(), expenseType);
    return super.add(receipt);
  }

  /**
   * Updates receipt expense type.
   * 
   * @param receipt Receipt to update the expense type in
   * @param expenseType New expense type
   */
  public updateReceiptExpenseType(receipt: Receipt, expenseType: string): Receipt | null {
    const index = this.list.findIndex((item) => item.id.id === receipt.id.id);
    if (index === -1) return null;

    const receiptToUpdate = this.list[index];
    if (receiptToUpdate.expenseType === expenseType) {
      return receiptToUpdate;
    }
    else
    {
      const receipt = 
        {...receiptToUpdate, id: EntityId.createForString(), expenseType: expenseType};
      this.list[index] = receipt;
      return receipt;
    }
  }

  /**
   * Deletes receipt from the list.
   * Added to make the class interface consistent - 
   * themethod just calls the parent class delete() method.
   * 
   * @param receipt Receipt to delete
   */
  public deleteReceipt(receipt: Receipt): boolean {
    return this.delete(receipt);
  }

  /**
   * Adds new receipt line.
   * 
   * @param receipt Receipt to add the line to
   * @returns Added line
   */
  public addReceiptLine(receipt: Receipt): ReceiptLine {
    const newReceiptLine: ReceiptLine = receipt.addLine();
    return newReceiptLine;
  }

  /**
   * Updates receipt line.
   * Searches for the existing line with the same ID.
   * If not found returns null.
   * If found but both name and amount are the same returns an existing receipt line.
   * If either name or amount are different replaces the receipt line with the new one
   * and returns the object passed as a parameter.
   * 
   * @param receipt receipt to update the line in
   * @param receiptLine Object with new line data
   */
  public updateReceiptLine(receipt: Receipt, receiptLine: ReceiptLine): ReceiptLine | null {
    const newReceiptLine: ReceiptLine | null = receipt.updateLine(receiptLine);
    if (newReceiptLine !== null) {
      this.recalculateSummary();
    }
    return newReceiptLine;
  }

  /**
   * Deletes the given receipt line.
   * 
   * @param receiptLine Receipt line to delete
   * @returns true if the line has been deleted or false if it has not been found
   */
  public deleteReceiptLine(receipt: Receipt, receiptLine: ReceiptLine): boolean {
    const deletedFlag: boolean = receipt.delete(receiptLine);
    if (deletedFlag) {
      this.recalculateSummary();
    }
    return deletedFlag;
  }
}