import { ApiModelProperty } from '@nestjs/swagger';

export class BookModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    title?: string;
    @ApiModelProperty()
    author?: string;
    @ApiModelProperty()
    price?: number;
    @ApiModelProperty()
    isDel?: boolean;
}
