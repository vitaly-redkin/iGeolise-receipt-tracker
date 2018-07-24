/**
 * Class to encapsulate enity IDs.
 *
 * Haoyi teaches us to box ID fields into separate classes:-)
 */

 import {newUUID} from './ModelUtils';

 export class EntityId<TIdType> {
   /**
    * Constructor.
    * @param id ID to encapsulate
    */
   public constructor (public readonly id: TIdType) {
   }

   /**
    * Generates new unique string ID.
    */
   public static CREATE_FOR_STRING(): EntityId<string> {
    return new EntityId<string>(newUUID());
   }
 }
