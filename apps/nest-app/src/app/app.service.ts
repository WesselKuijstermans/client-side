import { Injectable, NotFoundException } from '@nestjs/common';
import { TestDTO, TestEntity } from '@client-side/shared-lib';

@Injectable()
export class AppService {
  private people = [
    new TestEntity(1, 'John Doe'),
    new TestEntity(2, 'Jane Doe'),
    new TestEntity(3, 'John Smith'),
    new TestEntity(4, 'Jane Smith'),
  ];

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getPerson(id: number): { name: string } {
    const person = this.people.find((person) => person.id == id);
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return new TestDTO(person);
  }

  getPeople(): { name: string }[] {
    return this.people.map((person) => new TestDTO(person));
  }
}
