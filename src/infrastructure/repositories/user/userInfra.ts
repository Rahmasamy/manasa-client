// import { axios } from 'axios';
import { User } from '@/src/domain/models/user/User';
import { IUserRepository } from '@/src/domain/repositories/user/userRepository';


export class UserRepositoryImpl implements IUserRepository {
  async getUserById(id: string)  {
    // const response = await axios.get(`/api/users/${id}`);
    // return response.data;
  }
}
