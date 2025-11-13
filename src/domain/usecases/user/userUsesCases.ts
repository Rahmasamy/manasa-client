import { IUserRepository } from "../../repositories/user/userRepository";


export class GetUserProfile {
  constructor(private userRepo: IUserRepository) {}

  async execute(id: string) {
    return await this.userRepo.getUserById(id);
  }
}
