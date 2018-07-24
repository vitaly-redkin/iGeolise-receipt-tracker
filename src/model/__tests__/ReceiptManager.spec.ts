/**
 * Tests for the ReceiptManager class.
 */

import * as ReceiptManager from '../ReceiptManager';
import { ReceiptListEntity } from '../ReceiptListEntity';
import { ReceiptEntity } from '../ReceiptEntity';
import { ReceiptLineEntity } from '../ReceiptLineEntity';
import { EntityId } from '../EntityId';

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
    const randomExpenseType: string = "" + Math.random();
    const newReceiptList: ReceiptListEntity = ReceiptManager.addReceipt(
      receiptList, randomExpenseType);
    it('New receipt list object is not the same as an old one', () => {
      expect(newReceiptList !== receiptList).toBeTruthy();
    });
    it('Receipt added to the list', () => {
      expect(newReceiptList.summary.count === receiptList.summary.count + 1).toBeTruthy();
    });
    it('Receipt list total is unchanged', () => {
      expect(newReceiptList.summary.sum).toBe(receiptList.summary.sum);
    });
    it('Last Receipt in the list has our random expense type', () => {
      expect(newReceiptList.list[newReceiptList.summary.count - 1].expenseType).toBe(randomExpenseType);
    });
  });

  describe("Receipt deletion test", () => {
    const {receiptList} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const deletedReceipt = receiptList.list[0];
    const newReceiptList: ReceiptListEntity = ReceiptManager.deleteReceipt(
      receiptList, deletedReceipt);
    it('New receipt list object is not the same as an old one', () => {
        expect(newReceiptList !== receiptList).toBeTruthy();
      });
    it('Receipt list total decreased', () => {
      expect(newReceiptList.summary.sum).toBe(receiptList.summary.sum - deletedReceipt.summary.sum);
    });
    it('Receipt list count decreased', () => {
      expect(newReceiptList.summary.count).toBe(receiptList.summary.count - 1);
    });
  });

  describe("Receipt expense type update test", () => {
    const {receiptList} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const receipt: ReceiptEntity = receiptList.list[0];
    const newExpenseType: string = receipt.expenseType + " UPDATED";
    const newReceiptList: ReceiptListEntity = ReceiptManager.updateReceiptExpenseType(
      receiptList, receipt, newExpenseType);
    const newReceipt: ReceiptEntity = newReceiptList.list[0];
    it('New receipt list object is not the same as an old one', () => {
      expect(newReceiptList !== receiptList).toBeTruthy();
      });
    it('Receipt expense type was updated', () => {
      expect(newReceipt.expenseType).toBe(newExpenseType);
    });
    it('IDs of the old and new receipts are the same', () => {
      expect(newReceipt.id === receipt.id).toBeTruthy();
    });
    it('Receipt list total is the same', () => {
      expect(newReceiptList.summary.sum === newReceiptList.summary.sum).toBeTruthy();
    });
  });

  describe("Receipt line addition test", () => {
    const {receiptList} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const receipt: ReceiptEntity = receiptList.list[0];
    const newReceiptList: ReceiptListEntity = ReceiptManager.addReceiptLine(
      receiptList, receipt);
    const newReceipt: ReceiptEntity = newReceiptList.list[0];  
    it('New receipt list object is not the same as an old one', () => {
      expect(newReceiptList !== receiptList).toBeTruthy();
      });
    it('New receipt object is not the same as an old one', () => {
      expect(newReceipt !== receipt).toBeTruthy();
    });
    it('Line has been added to receipt', () => {
      expect(newReceipt.summary.count === receipt.summary.count + 1).toBeTruthy();
    });
  });

  describe("Receipt Line amount update test", () => {
    const {receiptList, sum} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const receipt: ReceiptEntity = receiptList.list[0];
    const receiptLine: ReceiptLineEntity = receipt.list[0];
    const delta: number = 123;
    const newAmount: number = receiptLine.amount + delta;
    const newName: string = receiptLine.name + " UPDATED";
    const updatedReceiptLine: ReceiptLineEntity = new ReceiptLineEntity(
      receiptLine.id, newName, newAmount);
    const newReceiptList: ReceiptListEntity = ReceiptManager.updateReceiptLine(
      receiptList, receipt, updatedReceiptLine);
    const newReceipt: ReceiptEntity = newReceiptList.list[0];  
    const newReceiptLine: ReceiptLineEntity = newReceipt.list[0];
    it('New receipt list object is not the same as an old one', () => {
      expect(newReceiptList !== receiptList).toBeTruthy();
      });
    it('New receipt object is not the same as an old one', () => {
      expect(newReceipt !== receipt).toBeTruthy();
    });
    it('New receipt line object is not the same as an old one', () => {
      expect(newReceiptLine !== receiptLine).toBeTruthy();
    });
    it('Receipt line name updated', () => {
      expect(newReceiptLine.name).toBe(newName);
    });
    it('Receipt line amount updated', () => {
      expect(newReceiptLine.amount).toBe(newAmount);
    });
    it('Receipt total changed by ' + delta, () => {
      expect(newReceipt.summary.sum - receipt.summary.sum).toBe(delta);
    });
    it('Receipt list total was updated by ' + delta, () => {
      expect(newReceiptList.summary.sum - sum).toBe(delta);
    });
  });

  describe("Receipt Line delete test", () => {
    const {receiptList, sum} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const receipt: ReceiptEntity = receiptList.list[0];
    const receiptLine: ReceiptLineEntity = receipt.list[0];
    const newReceiptList: ReceiptListEntity = ReceiptManager.deleteReceiptLine(
      receiptList, receipt, receiptLine);
    const newReceipt: ReceiptEntity = newReceiptList.list[0];  
    it('New receipt list object is not the same as an old one', () => {
      expect(newReceiptList !== receiptList).toBeTruthy();
      });
    it('New receipt object is not the same as an old one', () => {
      expect(newReceipt !== receipt).toBeTruthy();
    });
    it('Line has been removed from receipt', () => {
      expect(newReceipt.summary.count === receipt.summary.count - 1).toBeTruthy();
    });
    it('Receipt total decreated', () => {
      expect(receipt.summary.sum - newReceipt.summary.sum).toBe(receiptLine.amount);
    });
    it('Receipt list total decreased', () => {
      expect(sum - newReceiptList.summary.sum).toBe(receiptLine.amount);
    });
  });
});

/**
 * Creates receipt list with the given number of receipt.
 * 
 * @param receiptCount Number of lines to create a receipt
 * @param maxLineCount Maximal number of lines per receipt
 * @returns object with the created reseipt and the total amount of lines 
 * calculated independently
 */
function createReceiptList(receiptCount: number, maxLineCount: number): 
    { receiptList: ReceiptListEntity, sum: number}  {
  const receiptList: ReceiptListEntity = new ReceiptListEntity();
  let total: number = 0;
  for (let i = 0; i < receiptCount; i++)
  {
    const expenseType = 'Expense Type ' + (i % 2 + 1);
    const lineCount = Math.floor(Math.random() * (maxLineCount - 1) + 1);
    const {receipt, sum} = createReceipt(lineCount, expenseType);
    receiptList.list.push(receipt);
    total += sum;
  }
  receiptList.summary = ReceiptManager.createListSummary<ReceiptEntity>(receiptList.list);
  return { receiptList, sum: total};
}

/**
 * Creates receipt with the given number of lines.
 * 
 * @param count Number of lines to create a receipt
 * @param expenseType Receipt expense type
 * @returns object with the created reseipt and the total amount of lines 
 * calculated independently
 */
function createReceipt(count: number, expenseType: string = ""): 
    { receipt: ReceiptEntity, sum: number}  {
  let sum = 0;
  for (let i = 0; i < count; i++)
  {
    sum += (i + 1) * 100;
  }
  const receipt: ReceiptEntity = new ReceiptEntity(EntityId.CREATE_FOR_STRING(), expenseType, sum);
  for (let i = 0; i < count; i++)
  {
    const name = 'Line ' + (i + 1);
    const amount = (i + 1) * 100;
    receipt.list.push(new ReceiptLineEntity(EntityId.CREATE_FOR_STRING(), name, amount));
  }
  receipt.summary = ReceiptManager.createListSummary<ReceiptLineEntity>(receipt.list);
  return { receipt, sum};
}