import { User } from "../../models/user/User";

export interface IUserRepository {
  getUserById(id: string): Promise<User>;
}
