/**
 * Tests for the ReceiptManager class.
 */

import * as ReceiptManager from '../ReceiptManager';
import {ReceiptList} from '../ReceiptList';
import {Receipt} from '../Receipt';
import {ReceiptLine} from '../ReceiptLine';
import {EntityId} from '../EntityId';

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
    const newReceiptList: ReceiptList = ReceiptManager.addReceipt(receiptList, randomExpenseType);
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
    const newReceiptList: ReceiptList = ReceiptManager.deleteReceipt(
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
    const receipt: Receipt = receiptList.list[0];
    const newExpenseType: string = receipt.expenseType + " UPDATED";
    const newReceiptList: ReceiptList = ReceiptManager.updateReceiptExpenseType(
      receiptList, receipt, newExpenseType);
    const newReceipt: Receipt = newReceiptList.list[0];
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
    const receipt: Receipt = receiptList.list[0];
    const newReceiptList: ReceiptList = ReceiptManager.addReceiptLine(
      receiptList, receipt);
    const newReceipt: Receipt = newReceiptList.list[0];  
/* TO DO: not sure if this one should work      
    it('New receipt list object is not the same as an old one', () => {
      expect(newReceiptList !== receiptList).toBeTruthy();
      });
*/      
    it('New receipt object is not the same as an old one', () => {
      expect(newReceipt !== receipt).toBeTruthy();
    });
    it('Line has been added to receipt', () => {
      expect(newReceipt.summary.count === receipt.summary.count + 1).toBeTruthy();
    });
  });

  describe("Receipt Line amount update test", () => {
    const {receiptList, sum} = createReceiptList(COUNT, MAX_LINE_COUNT);
    const receipt: Receipt = receiptList.list[0];
    const receiptLine: ReceiptLine = receipt.list[0];
    const delta: number = 123;
    const newAmount: number = receiptLine.amount + delta;
    const newName: string = receiptLine.name + " UPDATED";
    const updatedReceiptLine: ReceiptLine = new ReceiptLine(receiptLine.id, newName, newAmount);
    const newReceiptList: ReceiptList = ReceiptManager.updateReceiptLine(
      receiptList, receipt, updatedReceiptLine);
    const newReceipt: Receipt = newReceiptList.list[0];  
    const newReceiptLine: ReceiptLine = newReceipt.list[0];
/* TO DO: not sure if this one should work      
    it('New receipt list object is not the same as an old one', () => {
      expect(newReceiptList !== receiptList).toBeTruthy;
      });
*/      
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
    const receipt: Receipt = receiptList.list[0];
    const receiptLine: ReceiptLine = receipt.list[0];
    const newReceiptList: ReceiptList = ReceiptManager.deleteReceiptLine(
      receiptList, receipt, receiptLine);
    const newReceipt: Receipt = newReceiptList.list[0];  
/* TO DO: not sure if this one should work      
    it('New receipt list object is not the same as an old one', () => {
      expect(newReceiptList !== receiptList).toBeTruthy;
      });
*/      
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
    { receiptList: ReceiptList, sum: number}  {
  const receiptList: ReceiptList = new ReceiptList();
  let total: number = 0;
  for (let i = 0; i < receiptCount; i++)
  {
    const expenseType = 'Expense Type ' + (i % 2 + 1);
    const lineCount = Math.floor(Math.random() * (maxLineCount - 1) + 1);
    const {receipt, sum} = createReceipt(lineCount, expenseType);
    receiptList.list.push(receipt);
    total += sum;
  }
  receiptList.summary = ReceiptManager.createListSummary<Receipt>(receiptList.list);
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
    { receipt: Receipt, sum: number}  {
  let sum = 0;
  for (let i = 0; i < count; i++)
  {
    sum += (i + 1) * 100;
  }
  const receipt: Receipt = new Receipt(EntityId.CREATE_FOR_STRING(), expenseType, sum);
  for (let i = 0; i < count; i++)
  {
    const name = 'Line ' + (i + 1);
    const amount = (i + 1) * 100;
    receipt.list.push(new ReceiptLine(EntityId.CREATE_FOR_STRING(), name, amount));
  }
  receipt.summary = ReceiptManager.createListSummary<ReceiptLine>(receipt.list);
  return { receipt, sum};
}