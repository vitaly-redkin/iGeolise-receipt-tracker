/**
 * Base class for all entities.
 */

 import {EntityId} from './EntityId';

export class BaseEntity<IdType> {
  /**
   * Constructor.
   * @param id ID of the entity
   */
  constructor (public readonly id: EntityId<IdType>) {
  }
}
