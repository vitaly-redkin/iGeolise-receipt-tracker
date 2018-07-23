/**
 * Base class for classes which contain list of enities with amounts.
 */

import {BaseEntityList} from './BaseEntityList';
import {IEntityWithAmount} from './IEntityWithAmount';
import {EntityId} from './EntityId';
import { EntityListSummary } from "./EntityListSummary";

export class BaseEntityWithAmountList<EntityType extends IEntityWithAmount, IdType> 
  extends BaseEntityList<EntityType extends IEntityWithAmount, IdType> {

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
      public readonly id: EntityId<IdType>) {
      super(id);
      this.recalculateSummary();
    }
  
    /**
     * Recalculates receipt summary. 
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
    }}
