import { StorableEntity } from './storable-entity';

export interface EntityFactory<T extends StorableEntity<ReturnType<T['toPOJO']>>> {
  create(entityPlainData: ReturnType<T['toPOJO']>): T;
}
