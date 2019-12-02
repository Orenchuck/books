import { Book } from 'src/entities/book.entity';

export const booksProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useValue: Book,
  },
];
