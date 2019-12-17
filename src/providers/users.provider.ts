
import { User } from 'src/entities/user.entity';
import { USERS_REPOSITORY } from 'src/constants/constants';

export const userProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
