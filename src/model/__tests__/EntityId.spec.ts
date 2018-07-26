/**
 * Tests for the EntityId class.
 */

 import { EntityId } from '../EntityId';

describe('Test EntityId class', () => {
  const COUNT: number = 1000;
  const idList: EntityId<string>[] = new Array<EntityId<string>>();
  for (let i = 0; i < COUNT; i++) {
    const id = EntityId.CREATE_FOR_STRING();
    if (idList.findIndex(item => item.id === id.id) === -1) {
      idList.push(id);
    }
  }

  it('All ' + COUNT + ' of generated IDs are unique', () => {
    expect(idList.length).toBe(COUNT);
    });

  const id =  EntityId.CREATE_FOR_STRING()
  const isUUID: boolean = id.id.match(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    !== null;
  it('ID looks like UUI', () => {
      expect(isUUID).toBeTruthy();
      });
  });
