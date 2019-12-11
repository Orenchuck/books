import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderModel {
  @ApiModelProperty()
  userId?: string;
  @ApiModelProperty()
  currency?: string;
  @ApiModelProperty()
  amount?: number;
}
