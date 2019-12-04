import { AuthorsBooks } from 'src/entities/authors-books.entity';
import { AUTHORS_BOOKS_REPOSITORY } from 'src/constants/constants';

export const authorsBooksProviders = [
  {
    provide: AUTHORS_BOOKS_REPOSITORY,
    useValue: AuthorsBooks,
  },
];
