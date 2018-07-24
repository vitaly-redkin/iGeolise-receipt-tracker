/**
 * Base class for entities which contain list of other entities.
 */

import { BaseEntity } from './BaseEntity';
import { EntityId } from './EntityId';

export class BaseEntityList<TEntityType, TIdType> extends BaseEntity<TIdType> {
  /**
   * List which contain child entities.
   */
  public readonly list: TEntityType[] = [];

  /**
   * Constructor.
   * @param id ID of the entity
   */
  constructor (public readonly id: EntityId<TIdType>) {
    super(id);
  }
}
