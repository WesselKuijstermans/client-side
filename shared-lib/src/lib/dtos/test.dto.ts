import { TestEntity } from '../entities/test.entity';

export class TestDTO {
  readonly name: string;

  constructor(testEntity: TestEntity) {
    this.name = testEntity.name;
  }
}
