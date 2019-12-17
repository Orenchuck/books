import { ApiModelProperty } from '@nestjs/swagger';

export class OrderItemModel {
  @ApiModelProperty()
  id?: string;
  @ApiModelProperty()
  orderId?: string;
  @ApiModelProperty()
  bookId?: string;
  @ApiModelProperty()
  count?: number;
  @ApiModelProperty()
  amount?: number;
}
