import { Book } from 'src/entities/book.entity';
import { BOOKS_REPOSITORY } from 'src/constants/constants';

export const booksProviders = [
  {
    provide: BOOKS_REPOSITORY,
    useValue: Book,
  },
];
