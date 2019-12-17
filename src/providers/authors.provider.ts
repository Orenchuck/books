import { Author } from 'src/entities/author.entity';
import { AUTHORS_REPOSITORY } from 'src/constants/constants';

export const authorsProviders = [
  {
    provide: AUTHORS_REPOSITORY,
    useValue: Author,
  },
];
