/**
 * Tests for the ReceiptList class.
 */

import {ReceiptList} from '../ReceiptList';
import {Receipt} from '../Receipt';
import {ReceiptLine} from '../ReceiptLine';
import {EntityId} from '../EntityId';
import {createReceipt} from './Receipt.spec';

describe('Test Receipt class', () => {
  const COUNT: number = 10;
  const MAX_LINE_COUNT = 10;

  describe("Receipt list creation test", () => {
    const {receiptList, sum} = createReceiptList(COUNT, MAX_LINE_COUNT);
    it('Receipt list has ' + COUNT + ' receipts', () => {
      expect(receiptList.summary.count).toBe(COUNT);
    });
    it('Receipt list total is ' + sum, () => {
      expect(receiptList.summary.sum).toBe(sum);
    });
  });

  describe("Receipt addition test", () => {
    const {receiptList} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const oldReceiptListSum = receiptList.summary.sum;
    const oldReceiptListCount = receiptList.summary.count;
    const randomExpenseType: string = "" + Math.random();
    receiptList.addReceipt(randomExpenseType);
    it('Receipt added to the list', () => {
      expect(receiptList.summary.count === oldReceiptListCount + 1).toBeTruthy();
    });
    it('Receipt list total is unchanged', () => {
      expect(receiptList.summary.sum).toBe(oldReceiptListSum);
    });
    it('Last Receipt in the list has our random expense type', () => {
      expect(receiptList.list[receiptList.summary.count - 1].expenseType).toBe(randomExpenseType);
    });
  });

  describe("Receipt deletion test", () => {
    const {receiptList} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const oldReceiptListSum = receiptList.summary.sum;
    const oldReceiptListCount = receiptList.summary.count;
    const deletedReceipt = receiptList.list[0];
    const deletedReceiptSum = deletedReceipt.summary.sum;
    const deletedFlag: boolean = receiptList.deleteReceipt(deletedReceipt);
    it('Receipt has been deleted', () => {
      expect(deletedFlag).toBeTruthy();
    });
    it('Receipt list total decreased', () => {
      expect(receiptList.summary.sum).toBe(oldReceiptListSum - deletedReceiptSum);
    });
    it('Receipt list count decreased', () => {
      expect(receiptList.summary.count).toBe(oldReceiptListCount - 1);
    });
  });

  describe("Receipt expense type update test", () => {
    const {receiptList, sum} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const receipt = receiptList.list[0];
    const newExpenseType = receipt.expenseType + " UPDATED";
    const updatedReceipt = receiptList.updateReceiptExpenseType(receipt, newExpenseType);
    it('Receipt to update has been found', () => {
      expect(updatedReceipt !== null).toBeTruthy();
    });
    if (updatedReceipt !== null) {
      it('Receipt expense type was updated', () => {
        expect(updatedReceipt.expenseType).toBe(newExpenseType);
      });
      it('New object was created as a result of an update', () => {
        expect(updatedReceipt !== receipt).toBeTruthy();
      });
      it('IDs of the old and new receipts are the same', () => {
        expect(updatedReceipt.id === updatedReceipt.id).toBeTruthy();
      });
      it('Receipt list total is the same', () => {
        expect(sum === receiptList.summary.sum).toBeTruthy();
      });
    }
  });

  describe("Receipt line addition test", () => {
    const {receiptList, sum} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const receipt: Receipt = receiptList.list[0];
    const oldReceiptSum = receipt.summary.sum;
    const oldReceiptCount = receipt.summary.count;
    const newAmount = 123;
    const newLine = receiptList.addReceiptLine(receipt);
    receiptList.updateReceiptLine(receipt, new ReceiptLine(newLine.id, newLine.name, newAmount));
    it('Line has been added to receipt', () => {
      expect(receipt.summary.count === oldReceiptCount + 1).toBeTruthy();
    });
    it('Receipt total changed by ' + newAmount, () => {
      expect(receipt.summary.sum - oldReceiptSum).toBe(newAmount);
    });
    it('Receipt list total was updated by ' + newAmount, () => {
      expect(receiptList.summary.sum - sum).toBe(newAmount);
    });
  });

  describe("Receipt Line amount update test", () => {
    const {receiptList, sum} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const receipt: Receipt = receiptList.list[0];
    const testLine: ReceiptLine = receipt.list[0];
    const oldReceiptSum = receipt.summary.sum;
    const delta = 123;
    const newAmount = testLine.amount + delta;
    const updatedLine = new ReceiptLine(testLine.id, testLine.name, newAmount);
    const lineAfterUpdate = receiptList.updateReceiptLine(receipt, updatedLine);
    it('Line to update has been found', () => {
      expect(lineAfterUpdate !== null).toBeTruthy();
    });
    if (lineAfterUpdate !== null) {
      it('Receipt total changed by ' + delta, () => {
        expect(receipt.summary.sum - oldReceiptSum).toBe(delta);
      });
      it('Receipt list total was updated by ' + delta, () => {
        expect(receiptList.summary.sum - sum).toBe(delta);
      });
    }
  });

  describe("Receipt Line delete test", () => {
    const {receiptList, sum} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const receipt: Receipt = receiptList.list[0];
    const testLine: ReceiptLine = receipt.list[0];
    const deletedLineAmount = testLine.amount;
    const oldReceiptSum = receipt.summary.sum;
    const deletedFlag = receiptList.deleteReceiptLine(receipt, testLine);
    it('Line has been deleted', () => {
      expect(deletedFlag).toBeTruthy();
    });
    it('Receipt total decreased', () => {
      expect(receipt.summary.sum).toBe(oldReceiptSum - deletedLineAmount);
    });
    it('Receipt list total decreased', () => {
      expect(receiptList.summary.sum).toBe(sum - deletedLineAmount);
    });
  });
});

/**
 * Creates receipt with the given number of lines.
 * 
 * @param receiptCount Number of lines to create a receipt
 * @param maxLineCount Maximal number of lines per receipt
 * @returns object with the created reseipt and the total amount of lines 
 * calculated independently
 */
export function createReceiptList(receiptCount: number, maxLineCount: number): 
    { receiptList: ReceiptList, sum: number}  {
  const receiptList: ReceiptList = new ReceiptList(EntityId.createForString());
  let total: number = 0;
  for (let i = 0; i < receiptCount; i++)
  {
    const expenseType = 'Expense Type ' + (i % 2 + 1);
    const lineCount = Math.floor(Math.random() * (maxLineCount - 1) + 1);
    const {receipt, sum} = createReceipt(lineCount, expenseType);
    receiptList.add(receipt);
    total += sum;
  }
  return { receiptList, sum: total};
}