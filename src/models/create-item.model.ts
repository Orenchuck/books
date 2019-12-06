import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderItemModel {
  @ApiModelProperty()
  orderId?: string;
  @ApiModelProperty()
  bookId?: string;
  @ApiModelProperty()
  amount?: number;
}
