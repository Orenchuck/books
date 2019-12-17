import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderItemModel {
  @ApiModelProperty()
  orderId?: string;
  @ApiModelProperty()
  bookId?: string;
  @ApiModelProperty()
  count?: number;
  @ApiModelProperty()
  amount?: number;
}
