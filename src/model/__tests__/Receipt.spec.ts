/**
 * Tests for the Receipt class.
 */

import {Receipt} from '../Receipt';
import {ReceiptLine} from '../ReceiptLine';
import {EntityId} from '../EntityId';

describe('Test Receipt class', () => {
  const COUNT: number = 10;

  describe("Receipt creation test", () => {
    const {receipt, sum} = createReceipt(COUNT);
    it('Receipt has ' + COUNT + ' of lines', () => {
      expect(receipt.summary.count).toBe(COUNT);
    });
    it('Receipt total is ' + sum, () => {
      expect(receipt.summary.sum).toBe(sum);
    });
  });
  
  describe("Line name update test", () => {
    const {receipt} = createReceipt(COUNT);
    const testLine: ReceiptLine = receipt.list[0];
    const newName = testLine.name + ' UPDATED';
    const updatedLine = new ReceiptLine(testLine.id, newName, testLine.amount);
    const lineAfterUpdate = receipt.updateLine(updatedLine);
    it('Line to update has been found', () => {
      expect(lineAfterUpdate !== null).toBeTruthy();
    });
    if (lineAfterUpdate !== null) {
      it('Line name was updated', () => {
        expect(lineAfterUpdate.name).toBe(newName);
      });
      it('New object was created as a result of an update', () => {
        expect(lineAfterUpdate !== testLine).toBeTruthy();
      });
      it('IDs of the old and new lines are the same', () => {
        expect(lineAfterUpdate.id === testLine.id).toBeTruthy();
      });
    }
  });

  describe("Line amount update test", () => {
    const {receipt} = createReceipt(COUNT);
    const testLine: ReceiptLine = receipt.list[0];
    const oldReceiptSum = receipt.summary.sum;
    const delta = 123;
    const newAmount = testLine.amount + delta;
    const updatedLine = new ReceiptLine(testLine.id, testLine.name, newAmount);
    const lineAfterUpdate = receipt.updateLine(updatedLine);
    it('Line to update has been found', () => {
      expect(lineAfterUpdate !== null).toBeTruthy();
    });
    if (lineAfterUpdate !== null) {
      it('Line amount was updated by ' + delta, () => {
        expect(lineAfterUpdate.amount).toBe(newAmount);
      });
      it('New object was created as a result of an update', () => {
        expect(lineAfterUpdate !== testLine).toBeTruthy();
      });
      it('IDs of the old and new lines are the same', () => {
        expect(lineAfterUpdate.id === testLine.id).toBeTruthy();
      });
      it('Receipt total changed by ' + delta, () => {
        expect(receipt.summary.sum - oldReceiptSum).toBe(delta);
      });
    }
  });

  describe("Line 'no-update' test", () => {
    const {receipt} = createReceipt(COUNT);
    const testLine: ReceiptLine = receipt.list[0];
    const updatedLine = new ReceiptLine(testLine.id, testLine.name, testLine.amount);
    const lineAfterUpdate = receipt.updateLine(updatedLine);
    it('Line to update has been found', () => {
      expect(lineAfterUpdate !== null).toBeTruthy();
    });
    if (lineAfterUpdate !== null) {
      it('The same line object was returhed', () => {
        expect(lineAfterUpdate === testLine).toBeTruthy();
      });
    }
  });

  describe("Non existing line update test", () => {
    const {receipt} = createReceipt(COUNT);
    const testLine: ReceiptLine = receipt.list[0];
    const updatedLine = new ReceiptLine(EntityId.createForString(), testLine.name, testLine.amount);
    const lineAfterUpdate = receipt.updateLine(updatedLine);
    it('Line to update has been found', () => {
      expect(lineAfterUpdate === null).toBeTruthy();
    });
  });

  describe("Line delete test", () => {
    const {receipt} = createReceipt(COUNT);
    const testLine: ReceiptLine = receipt.list[0];
    const deletedLineAmount = testLine.amount;
    const oldReceiptSum = receipt.summary.sum;
    const oldReceiptCount = receipt.summary.count;
    const deletedFlag = receipt.delete(testLine);
    it('Line has been deleted', () => {
      expect(deletedFlag).toBeTruthy();
    });
    it('Number of receipt lines decreased', () => {
      expect(receipt.summary.count).toBe(oldReceiptCount - 1);
    });
    it('Receipt total decreased', () => {
      expect(receipt.summary.sum).toBe(oldReceiptSum - deletedLineAmount);
    });
  });

  describe("Non-existing line delete test", () => {
    const {receipt} = createReceipt(COUNT);
    const testLine: ReceiptLine = receipt.list[0];
    const oldReceiptSum = receipt.summary.sum;
    const oldReceiptCount = receipt.summary.count;
    const lineToDelete = new ReceiptLine(EntityId.createForString(), testLine.name, testLine.amount);
    const deletedFlag = receipt.delete(lineToDelete);
    it('Line has NOT been deleted', () => {
      expect(deletedFlag).toBeFalsy();
    });
    it('Number of receipt lines has NOT changed', () => {
      expect(receipt.summary.count).toBe(oldReceiptCount);
    });
    it('Receipt total has NOT changed', () => {
      expect(receipt.summary.sum).toBe(oldReceiptSum);
    });
  });
});

/**
 * Creates receipt with the given number of lines.
 * 
 * @param count Number of lines to create a receipt
 * @param expenseType Receipt expense type
 * @returns object with the created reseipt and the total amount of lines 
 * calculated independently
 */
export function createReceipt(count: number, expenseType: string = ""): 
    { receipt: Receipt, sum: number}  {
  const receipt: Receipt = new Receipt(EntityId.createForString(), expenseType);
  let sum: number = 0;
  for (let i = 0; i < count; i++)
  {
    const name = 'Line ' + (i + 1);
    const amount = (i + 1) * 100;
    const newLine = receipt.addLine();
    const updatedLine = new ReceiptLine(newLine.id, name, amount);
    receipt.updateLine(updatedLine);
    sum += amount;
  }
  return { receipt, sum};
}