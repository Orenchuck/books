import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookModel {
    @ApiModelProperty()
    title?: string;
    @ApiModelProperty()
    author?: string;
    @ApiModelProperty()
    price?: number;
}
