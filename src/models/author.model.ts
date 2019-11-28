import { BookDocument } from 'src/documents/book.document';

export class AuthorModel {
    id?: string;
    name?: string;
    books?: BookDocument[];
    birth?: Date;
    death?: Date;
    isDel?: boolean;
  }
