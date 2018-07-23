/**
 * Class to hold the receipt line data.
 */

import { BaseEntity } from "./BaseEntity";
import { EntityId } from "./EntityId";
import { IEntityWithAmount } from "./IEntityWithAmount";

export class ReceiptLine extends BaseEntity<string> implements IEntityWithAmount {
  /**
   * Constructor.
   * @param id ID of the entity
   * @param name Name of the receipt line
   * @param amount Receipt line amount
   */
  constructor(
    public readonly id: EntityId<string>,
    public readonly name: string,
    public readonly amount: number) {
    super(id);
  }
}