/**
 * Module to contain all CRUD methods fot the receipts.
 *
 * Haoyi teaches us:
 * "The simplest interface to a package is static method with standard types":-)
 */

import {EntityId} from './EntityId';
import { EntityListSummary } from './EntityListSummary';
import {IEntityWithIdAndAmount} from './IEntityWithIdAndAmount';
import {Receipt} from './Receipt';
import {ReceiptLine} from './ReceiptLine';
import {ReceiptList} from './ReceiptList';

// ----------
// Public API

/**
 * Adds new empty receipt to the list.
 *
 * @param receiptList List of receipt to work with
 * @param expenseType Receipt expense type
 * @returns New receipt list
 */
export function addReceipt(receiptList: ReceiptList, expenseType: string): ReceiptList {
  const receipt: Receipt = new Receipt(EntityId.CREATE_FOR_STRING(), expenseType);
  const list: Receipt[] = addEntityToList<Receipt>(receiptList.list, receipt);
  const summary: EntityListSummary = createListSummary(list);

  return {...receiptList, list, summary };
}

/**
 * Deletes receipt from the list.
 *
 * @param receiptList List of receipt to work with
 * @param receipt Receipt to delete
 * @returns New receipt list
 */
export function deleteReceipt(receiptList: ReceiptList, receipt: Receipt): ReceiptList {
  const list: Receipt[] = deleteEntityFromList<Receipt>(receiptList.list, receipt);
  const summary: EntityListSummary = createListSummary(list);

  return {...receiptList, list, summary };
}

/**
 * Updates receipt expense type.
 *
 * @param receiptList List of receipt to work with
 * @param receipt Receipt to update the expense type in
 * @param expenseType New expense type
 * @returns New receipt list
 */
export function updateReceiptExpenseType(
    receiptList: ReceiptList,
    receipt: Receipt,
    expenseType: string): ReceiptList {
  const index: number = findEntityIndex<Receipt>(receiptList.list, receipt);
  if (index === -1) { return receiptList; }

  const receiptToUpdate: Receipt = receiptList.list[index];
  if (receiptToUpdate.expenseType === expenseType) {
    return receiptList;
  } else {
    const newReceipt: Receipt = {...receiptToUpdate, expenseType};
    const list: Receipt[] = replaceEntityInList<Receipt>(receiptList.list, newReceipt);

    return {...receiptList, list };
  }
}

/**
 * Adds new receipt line.
 *
 * @param receiptList List of receipt to work with
 * @param receipt Receipt to add the line to
 * @returns New receipt list
 */
export function addReceiptLine(receiptList: ReceiptList, receipt: Receipt): ReceiptList {
  const receiptLine: ReceiptLine = new ReceiptLine(EntityId.CREATE_FOR_STRING(), '', 0);
  const listOfLines: ReceiptLine[] = addEntityToList<ReceiptLine>(receipt.list, receiptLine);

  return replaceLinesInReceipt(receiptList, receipt, listOfLines, false);
}

/**
 * Adds new receipt line.
 *
 * @param receiptList List of receipt to work with
 * @param receipt Receipt to add the line to
 * @returns New receipt list
 */
export function updateReceiptLine(
    receiptList: ReceiptList,
    receipt: Receipt,
    receiptLine: ReceiptLine): ReceiptList {
  const listOfLines: ReceiptLine[] = replaceEntityInList<ReceiptLine>(
    receipt.list, receiptLine);

  return replaceLinesInReceipt(receiptList, receipt, listOfLines);
}

/**
 * Deletes the given receipt line.
 *
 * @param receiptLine Receipt line to delete
 * @returns true if the line has been deleted or false if it has not been found
 */
export function deleteReceiptLine(
    receiptList: ReceiptList,
    receipt: Receipt,
    receiptLine: ReceiptLine): ReceiptList {
  const listOfLines: ReceiptLine[] = deleteEntityFromList<ReceiptLine>(receipt.list, receiptLine);

  return replaceLinesInReceipt(receiptList, receipt, listOfLines);
}

/**
 * Creates summary object by the given list of entities.
 * Exported to be used in the test cases.
 *
 * @param list List of entities to create summary for
 */
export function createListSummary<TEntityType extends IEntityWithIdAndAmount>(
  list: TEntityType[]): EntityListSummary {
const count: number = list.length;
const sum: number = list.reduce<number>((s: number, entity: TEntityType) => s + entity.amount, 0);

return new EntityListSummary(count, sum);
}

// --------------------------
// Internal utility functions

/**
 * Replaces the lines in the receipt and recalculates the receipt summary
 * and, optionally, receipt list summary.
 *
 * @param receiptList List of receipt to work with
 * @param receipt Receipt to replace the lines in
 * @param listOfLines List of receipt lines to set
 * @param recaclulateReceiptListSummary If true recalculates the receipt list summary
 * @returns New receipt list
 */
function replaceLinesInReceipt(
    receiptList: ReceiptList,
    receipt: Receipt,
    listOfLines: ReceiptLine[],
    recaclulateReceiptListSummary: boolean = true): ReceiptList {
  const receiptSummary: EntityListSummary = createListSummary(listOfLines);
  const newReceipt: Receipt = {
    ...receipt, list: listOfLines, summary: receiptSummary, amount: receiptSummary.sum};
  const listOfReceipts: Receipt[] = replaceEntityInList<Receipt>(receiptList.list, newReceipt);
  const receiptListSummary: EntityListSummary =
    (recaclulateReceiptListSummary ? createListSummary(listOfReceipts) : receiptList.summary);

  return {...receiptList, list: listOfReceipts, summary: receiptListSummary};
}

/**
 * Replaces an enity with the same ID as in the given one in the list.
 *
 * @param list List of entities to add a new one to.
 * @param entity Entity to add to the list
 * @returns New list with entities
 */
function addEntityToList<TEntityType extends IEntityWithIdAndAmount>(
    list: TEntityType[],
    entity: TEntityType): TEntityType[] {
  return list.concat(entity);
}

/**
 * Replaces an enity with the same ID as in the given one in the list.
 *
 * @param list List of entities to replace the give one in
 * @param entity Entity to update in the list
 * @returns New list with entities
 */
function replaceEntityInList<TEntityType extends IEntityWithIdAndAmount>(
    list: TEntityType[],
    entity: TEntityType): TEntityType[] {
  return list.map((item) => (item.id.id === entity.id.id ? entity : item));
}

/**
 * Deletes entity from the list.
 *
 * @param list List of entities to remove the give one from.
 * @param entity Entity to remove from the list
 * @returns true if the entity has been deleted or false if it has not been found
 */
function deleteEntityFromList<TEntityType extends IEntityWithIdAndAmount>(
    list: TEntityType[],
    entity: TEntityType): TEntityType[] {
  return list.filter((item) => item.id.id !== entity.id.id);
}

/**
 * Searches for the entity (by ID) in the list.
 *
 * @param list List of entities to remove the give one from.
 * @param entity Entity to search for
 * @returns Index of the entity in the list or -1 if not found
 */
function findEntityIndex<TEntityType extends IEntityWithIdAndAmount>(
    list: TEntityType[],
    entity: TEntityType): number {
  return list.findIndex((item) => item.id.id === entity.id.id);
}
