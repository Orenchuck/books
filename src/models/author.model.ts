import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthorModel {
  @ApiModelProperty()
  id?: string;
  @ApiModelProperty()
  name?: string;
  @ApiModelProperty()
  books?: mongoose.Schema.Types.ObjectId;
  @ApiModelProperty()
  birthDate?: Date;
  @ApiModelProperty()
  deathDate?: Date;
  @ApiModelProperty()
  isDel?: boolean;
}
