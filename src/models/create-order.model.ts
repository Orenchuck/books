import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderModel {
  @ApiModelProperty()
  userId?: string;
  @ApiModelProperty()
  paymentId?: string;
  @ApiModelProperty()
  currency?: string;
}
