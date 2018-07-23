/**
 * Base class for entities which contain list of other entities.
 */

import {BaseEntity} from './BaseEntity';
import {EntityId} from './EntityId';

export class BaseEntityList<EntityType, IdType> extends BaseEntity<IdType> {
  /**
   * List which contain child entities.
   */
  public readonly list: EntityType[] = new Array<EntityType>();

  /**
   * Constructor.
   * @param id ID of the entity
   */
  constructor (public readonly id: EntityId<IdType>) {
    super(id);
  }
}
