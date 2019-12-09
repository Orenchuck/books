import { ApiModelProperty } from '@nestjs/swagger';

export class FilterModel {
  @ApiModelProperty()
  priceFrom?: number;
  @ApiModelProperty()
  priceTo?: number;
  @ApiModelProperty()
  title?: string;
  @ApiModelProperty()
  author?: string;
}
