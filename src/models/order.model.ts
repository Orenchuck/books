import { ApiModelProperty } from '@nestjs/swagger';

export class OrderModel {
  @ApiModelProperty()
  id?: string;
  @ApiModelProperty()
  userId?: string;
  @ApiModelProperty()
  paymentId?: string;
  @ApiModelProperty()
  currency?: string;
  @ApiModelProperty()
  date?: Date;
  @ApiModelProperty()
  isDelete?: boolean;
}
