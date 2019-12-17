import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ImgRepository } from 'src/repositories/repoSql/img.repository';
import { ImgModel } from 'src/models/img.model';
import { Img } from 'src/entities/img.entity';
import { generateUuid } from 'src/common/random.helper';

@Injectable()
export class ImgService {
    constructor(
        private imgRepository: ImgRepository,
    ) { }

    async addImg(img, bookId) {
        const base64 = await this.saveImage(img.buffer);
        const imgToCreate: Img = {
            id: await generateUuid(),
            bookId: bookId.bookId,
            mimetype: img.mimetype,
            size: img.size,
            img: base64,
            isDelete: false,
        } as any;
        const resRepo: Img = await this.imgRepository.addImg(imgToCreate);
        const newImg: ImgModel = {};
        if (resRepo) {
            newImg.id = resRepo.id;
            newImg.bookId = resRepo.bookId;
            newImg.size = resRepo.size;
            newImg.img = resRepo.img;
            newImg.isDelete = resRepo.isDelete;
        }
        return newImg;
    }

    async saveImage(img) {
        return new Buffer(img).toString('base64');
    }

    async getAllImg(): Promise<ImgModel[]> {
        const img: Img[] = await this.imgRepository.getAllImgs();
        if (!img) {
            throw new HttpException('You have no img', HttpStatus.NOT_FOUND);
        }
        const allImgs: ImgModel[] = [];
        for (const oneImg of img) {
            const imgs: ImgModel = {
                id: oneImg.id,
                bookId: oneImg.bookId,
                size: oneImg.size,
                img: oneImg.img,
                isDelete: oneImg.isDelete,
            };
            allImgs.push(imgs);
        }
        return allImgs;
    }

    async findImgById(id: string): Promise<ImgModel> {
        const img: ImgModel = {};
        const resRepo: Img = await this.imgRepository.findImgById(id);

        if (resRepo) {
            img.id = resRepo.id;
            img.bookId = resRepo.bookId;
            img.size = resRepo.size;
            img.img = resRepo.img;
            img.isDelete = resRepo.isDelete;
            return img;
        }
        throw new HttpException('Img does not exist!', HttpStatus.NOT_FOUND);
    }

    async updateImg(imgToUpdate: ImgModel): Promise<boolean> {
        const updateImgDoc: Img = {} as any;

        if (imgToUpdate) {
            updateImgDoc.id = imgToUpdate.id;
            updateImgDoc.bookId = imgToUpdate.bookId;
            updateImgDoc.size = imgToUpdate.size;
            updateImgDoc.img = imgToUpdate.img;
        }

        const resRepo = await this.imgRepository.updateImg(updateImgDoc);
        if (resRepo) {
            return true;
        }
        throw new HttpException('Img does not exist!', HttpStatus.NOT_FOUND);
    }

    async isDeleteImg(id: string): Promise<boolean> {
        const imgFromDb: Img = await this.imgRepository.findImgForDel(id);

        if (imgFromDb) {
            imgFromDb.isDelete = !imgFromDb.isDelete;
            const savedImg = await this.imgRepository.saveImg(imgFromDb);
            return savedImg;
        }
        throw new HttpException('Img does not exist!', HttpStatus.NOT_FOUND);
    }

    async deleteImg(id: string): Promise<boolean> {
        const resRepo = await this.imgRepository.deleteImg(id);
        if (!resRepo) {
            throw new HttpException('Img does not exist!', HttpStatus.NOT_FOUND);
        }
        return true;
    }
}
