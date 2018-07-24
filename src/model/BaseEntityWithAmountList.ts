/**
 * Base class for classes which contain list of enities with amounts.
 */

import { BaseEntityList } from './BaseEntityList';
import { EntityId } from './EntityId';
import { EntityListSummary } from './EntityListSummary';
import { IEntityWithIdAndAmount } from './IEntityWithIdAndAmount';

export class BaseEntityWithAmountList<TEntityType extends IEntityWithIdAndAmount>
  extends BaseEntityList<TEntityType, string> {
  /**
   * Returns entity summary.
   */
  public summary: EntityListSummary = new EntityListSummary(0, 0);

  /**
   * Constructor.
   * @param id ID of the receipt
   * @param expenseType Type of the expense the receipt covers
   */
  constructor(
    public readonly id: EntityId<string>) {
    super(id);
  }
}
