/**
 * Interface to implement if the entity has id and amount fields.
 */

 import { EntityId } from "./EntityId";

 export interface IEntityWithIdAndAmount {
   /**
    * Entity ID (of the string type).
    */
   id: EntityId<string>;

   /**
    * Enity amount.
    */
   amount: number;
 }