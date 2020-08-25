import { UniqueEntityID } from './UniqueEntityID';

export interface DomainEvent {
  getAggregateId(): UniqueEntityID;
}
