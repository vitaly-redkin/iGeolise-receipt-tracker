/**
 * Base class for classes which contain list of enities with amounts.
 */

import {BaseEntityList} from './BaseEntityList';
import {IEntityWithAmount} from './IEntityWithAmount';
import {EntityId} from './EntityId';
import { EntityListSummary } from "./EntityListSummary";

export class BaseEntityWithAmountList<TEntityType extends IEntityWithAmount, TIdType> 
  extends BaseEntityList<TEntityType extends IEntityWithAmount, TIdType> {

  protected _summary: EntityListSummary = new EntityListSummary(0, 0);

  /**
   * Returns receipt summary.
   */
  public get summary(): EntityListSummary {
    return this._summary;
  }

  /**
   * Constructor.
   * @param id ID of the receipt
   * @param expenseType Type of the expense the receipt covers
   */
  constructor(
    public readonly id: EntityId<TIdType>) {
    super(id);
    this.recalculateSummary();
  }

  /**
   * Adds new entity to the list.
   * Made public instead of protected to faclitate unit tests.
   * 
   * @returns Added entity
   */
  public add(entity: TEntityType): TEntityType {
    this.list.push(entity);
    this.recalculateSummary();
    return entity;
  }

  /**
   * Deletes the fiven entity from the list (finding it by ID).
   * 
   * @param entity Entity to delete to delete
   * @returns true if the entity has been deleted or false if it has not been found
   */
  public delete(entity: TEntityType): boolean {
    const index = this.list.findIndex((item) => item.id.id === entity.id.id);
    if (index === -1) {
      return false;
    } else {
      this.list.splice(index, 1);
      this.recalculateSummary();
      return true;
    }
  }

  /**
   * Recalculates entity summary. 
   * If count and sum are the same does nothing.
   * If either one of them is different creates a new summary object.
   */
  protected recalculateSummary(): void {
    const count = this.list.length;
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += this.list[i].amount;
    }
    if (this.summary.count !== count || this.summary.sum !== sum) {
      this._summary = new EntityListSummary(count, sum);
    }
  }
}
