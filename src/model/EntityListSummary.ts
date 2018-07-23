/**
 * Class to contain entity list summary.
 */

 export class EntityListSummary {
   /**
    * Constructor.
    * 
    * @param count Number of entities in the list.
    * @param sum Sum of the list entity amounts
    */
   constructor(public readonly count: number, public readonly sum: number) {
   }
 }