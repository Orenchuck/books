import { ApiModelProperty } from '@nestjs/swagger';

export class AuthorBookModel {
    @ApiModelProperty()
    authorId?: string;
    @ApiModelProperty()
    bookId?: string;
}
