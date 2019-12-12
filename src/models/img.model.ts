import { ApiModelProperty } from '@nestjs/swagger';

export class ImgModel {
  @ApiModelProperty()
  id?: string;
  @ApiModelProperty()
  bookId?: string;
  @ApiModelProperty()
  expansion?: string;
  @ApiModelProperty()
  size?: number;
  @ApiModelProperty()
  img?: string;
  @ApiModelProperty()
  isDelete?: boolean;
}
