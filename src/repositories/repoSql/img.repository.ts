import { Injectable, HttpException, Inject, HttpStatus } from '@nestjs/common';
import { Img } from 'src/entities/img.entity';
import { IMG_REPOSITORY } from 'src/constants/constants';

@Injectable()
export class ImgRepository {
    constructor(@Inject(IMG_REPOSITORY) private readonly imgRepository: typeof Img) { }

    async addImg(img) {
        try {
            const newImg = this.imgRepository.create(img);
            return newImg;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async getAllImgs(): Promise<Img[]> {
        const img = await this.imgRepository.findAll();
        return img;
    }

    async findImgById(id: string): Promise<Img> {
        try {
            const img = await this.imgRepository.findOne({ where: { id }});
            return img;
        } catch { throw new HttpException('Img does not exist!', HttpStatus.NOT_FOUND); }
    }

    async findImgForDel(id): Promise<Img> {
            const img = await this.imgRepository.findOne({ where: { id: id.id }});
            return img;
    }

    async updateImg(img: Img): Promise<any[]> {
        try {
            const updatedImg = await this.imgRepository.update(img, {where: { id: img.id }});
            return updatedImg;
        } catch { throw new HttpException('Img does not exist!', HttpStatus.NOT_FOUND); }
    }

    async saveImg(img): Promise<boolean> {
        try {
            const newImg = await img.save();
            return newImg;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async deleteImg(id: string) {
        const result = await this.imgRepository.destroy({ where: { id }});
        return result;
    }
}
