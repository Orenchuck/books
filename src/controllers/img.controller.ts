import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImgService } from 'src/services/servicesSql/img.service';
import { ImgModel } from 'src/models/img.model';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UserRole } from 'src/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('img')
@Controller('img')
@UseGuards(RolesGuard)
export class ImgController {
    constructor(private readonly imgService: ImgService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async uploadedFile(@UploadedFile() file, @Body() bookId) {
        const newImg = await this.imgService.addImg(file, bookId);
        return newImg;
    }

    @Get()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getAllImg(): Promise<ImgModel[]> {
        const img = await this.imgService.getAllImg();
        return img;
    }

    @Get(':imgID')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async findImgById(@Param('imgID') imgID: string): Promise<ImgModel> {
        const img = await this.imgService.findImgById(imgID);
        return img;
    }
    @Put()
    @Roles(UserRole.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async updateImg(@Body() imgToUpdate: ImgModel): Promise<boolean> {
        const img = await this.imgService.updateImg(imgToUpdate);
        return img;
    }

    @Put('del')
    @Roles(UserRole.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async isDeleteImg(@Body() id: string): Promise<boolean> {
        const deleteImg = await this.imgService.isDeleteImg(id);
        return deleteImg;
    }

    @Delete(':imgID')
    @Roles(UserRole.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async deleteImg(@Param('imgID') imgID: string): Promise<boolean> {
        const img = await this.imgService.deleteImg(imgID);
        return img;
    }

}
