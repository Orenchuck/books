import { ApiModelProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiModelProperty()
  id?: string;
  @ApiModelProperty()
  email?: string;
  @ApiModelProperty()
  password?: string;
  @ApiModelProperty()
  roles?: string;
  @ApiModelProperty()
  active?: boolean;
  @ApiModelProperty()
  cypher?: string;
  @ApiModelProperty()
  isDelete?: boolean;
}
