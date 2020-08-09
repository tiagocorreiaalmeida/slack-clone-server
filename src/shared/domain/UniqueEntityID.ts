import { v4 as uuid } from 'uuid';

export class UniqueEntityID {
  value: string;
  constructor(id?: string) {
    this.value = id || uuid();
  }

  equals(id: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

  toValue(): string {
    return this.value;
  }
}
