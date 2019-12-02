import { ApiModelProperty } from '@nestjs/swagger';

export class AuthorModel {
  @ApiModelProperty()
  id?: string;
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
  @ApiModelProperty()
  isDel?: boolean;
}
