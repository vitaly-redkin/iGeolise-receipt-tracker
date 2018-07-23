/**
 * Class to encapsulate enity IDs.
 * 
 * Haoyi teaches us to box ID fields into separate classes:-)
 */

 import {newUUID} from './ModelUtils';

 export class EntityId<T> {
   /**
    * Constructor.
    * @param id ID to encapsulate
    */
   public constructor (public readonly id: T) {
   }

   /**
    * Generates new unique string ID.
    */
   static generateWithString(): EntityId<string> {
    return new EntityId<string>(newUUID());
   }
 }