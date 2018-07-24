/**
 * Module to contain all CRUD methods fot the receipts.
 *
 * Haoyi teaches us:
 * "The simplest interface to a package is static method with standard types":-)
 */

import { EntityId } from './EntityId';
import { EntityListSummary } from './EntityListSummary';
import { IEntityWithIdAndAmount } from './IEntityWithIdAndAmount';
import { ReceiptEntity } from './ReceiptEntity';
import { ReceiptLineEntity } from './ReceiptLineEntity';
import { ReceiptListEntity } from './ReceiptListEntity';

// ----------
// Public API

/**
 * Adds new empty receipt to the list.
 *
 * @param receiptList List of receipt to work with
 * @param expenseType Receipt expense type
 * @returns New receipt list
 */
export function addReceipt(
    receiptList: ReceiptListEntity,
    expenseType: string): ReceiptListEntity {
  const receipt: ReceiptEntity = new ReceiptEntity(EntityId.CREATE_FOR_STRING(), expenseType);
  const list: ReceiptEntity[] = addEntityToList<ReceiptEntity>(receiptList.list, receipt);
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
export function deleteReceipt(
  receiptList: ReceiptListEntity,
  receipt: ReceiptEntity): ReceiptListEntity {
  const list: ReceiptEntity[] = deleteEntityFromList<ReceiptEntity>(
    receiptList.list, receipt);
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
    receiptList: ReceiptListEntity,
    receipt: ReceiptEntity,
    expenseType: string): ReceiptListEntity {
  const index: number = findEntityIndex<ReceiptEntity>(receiptList.list, receipt);
  if (index === -1) { return receiptList; }

  const receiptToUpdate: ReceiptEntity = receiptList.list[index];
  if (receiptToUpdate.expenseType === expenseType) {
    return receiptList;
  } else {
    const newReceipt: ReceiptEntity = {...receiptToUpdate, expenseType};
    const list: ReceiptEntity[] = replaceEntityInList<ReceiptEntity>(receiptList.list, newReceipt);

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
export function addReceiptLine(
    receiptList: ReceiptListEntity,
    receipt: ReceiptEntity): ReceiptListEntity {
  const receiptLine: ReceiptLineEntity = new ReceiptLineEntity(
    EntityId.CREATE_FOR_STRING(), '', 0);
  const listOfLines: ReceiptLineEntity[] = addEntityToList<ReceiptLineEntity>(
    receipt.list, receiptLine);

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
    receiptList: ReceiptListEntity,
    receipt: ReceiptEntity,
    receiptLine: ReceiptLineEntity): ReceiptListEntity {
  const listOfLines: ReceiptLineEntity[] = replaceEntityInList<ReceiptLineEntity>(
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
    receiptList: ReceiptListEntity,
    receipt: ReceiptEntity,
    receiptLine: ReceiptLineEntity): ReceiptListEntity {
  const listOfLines: ReceiptLineEntity[] = deleteEntityFromList<ReceiptLineEntity>(
    receipt.list, receiptLine);

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
    receiptList: ReceiptListEntity,
    receipt: ReceiptEntity,
    listOfLines: ReceiptLineEntity[],
    recaclulateReceiptListSummary: boolean = true): ReceiptListEntity {
  const receiptSummary: EntityListSummary = createListSummary(listOfLines);
  const newReceipt: ReceiptEntity = {
    ...receipt, list: listOfLines, summary: receiptSummary, amount: receiptSummary.sum};
  const listOfReceipts: ReceiptEntity[] = replaceEntityInList<ReceiptEntity>(receiptList.list, newReceipt);
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
