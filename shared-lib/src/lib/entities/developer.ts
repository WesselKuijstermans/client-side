import { UserEntity } from "./user";

export class DeveloperEntity {
  id: number;
  name: string;
  email: string;
  createdBy: UserEntity

  constructor(id: number, name: string, email: string, createdBy: UserEntity) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdBy = createdBy;
  }
}
