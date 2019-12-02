import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserModel {
  @ApiModelProperty()
  email?: string;
  @ApiModelProperty()
  password?: string;
}
