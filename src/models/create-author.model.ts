import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthorModel {
  @ApiModelProperty()
  name?: string;
  @ApiModelProperty()
  books?: string;
  @ApiModelProperty({
    example: new Date(Date.now()),
    type: String,
    required: true,
  })
  birthDate?: Date;
  @ApiModelProperty({
    example: new Date(Date.now()),
    type: String,
    required: true,
  })
  deathDate?: Date;
}
