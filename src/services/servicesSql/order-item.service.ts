import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderItemRepository } from 'src/repositories/repoSql/order-item.repository';
import { OrderItemModel } from 'src/models/order-item.model';
import { CreateOrderItemModel } from 'src/models/create-item.model';
import { OrderItem } from 'src/entities/order-item.entity';
import { generateUuid } from 'src/common/random.helper';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class OrderItemsService {
    constructor(
        private orderItemRepository: OrderItemRepository,
    ) { }

    async addOrderItem(orderItem: CreateOrderItemModel): Promise<OrderItemModel> {
        const orderItemToCreate: OrderItem = {
            id: await generateUuid(),
            orderId: orderItem.orderId,
            bookId: orderItem.bookId,
            count: orderItem.count,
            amount: orderItem.amount,
        } as any;
        const resRepo: OrderItem = await this.orderItemRepository.addOrderItem(orderItemToCreate);
        const newOrderItem: OrderItemModel = {};
        if (resRepo) {
            newOrderItem.id = resRepo.id;
            newOrderItem.orderId = resRepo.orderId;
            newOrderItem.bookId = resRepo.bookId;
            newOrderItem.count = resRepo.count;
            newOrderItem.amount = resRepo.amount;
        }
        return newOrderItem;
    }

    async getAllOrderItems(): Promise<OrderItemModel[]> {
        const orderItems: OrderItem[] = await this.orderItemRepository.getAllOrderItems();
        if (!orderItems) {
            throw new HttpException('You have no orderItems', HttpStatus.NOT_FOUND);
        }
        const allOrderItems: OrderItemModel[] = [];
        for (const oneOrderItem of orderItems) {
            const orderItem: OrderItemModel = {
                id: oneOrderItem.id,
                orderId: oneOrderItem.orderId,
                bookId: oneOrderItem.bookId,
                count: oneOrderItem.count,
                amount: oneOrderItem.amount,
            };
            allOrderItems.push(orderItem);
        }
        return allOrderItems;
    }

    async findOrderItemById(id: string): Promise<OrderItemModel> {
        const orderItem: OrderItemModel = {};
        const resRepo: OrderItem = await this.orderItemRepository.findOrderItemById(id);

        if (resRepo) {
            orderItem.id = resRepo.id;
            orderItem.orderId = resRepo.orderId;
            orderItem.bookId = resRepo.bookId;
            orderItem.count = resRepo.count;
            orderItem.amount = resRepo.amount;
            return orderItem;
        }
        throw new HttpException('OrderItem does not exist!', HttpStatus.NOT_FOUND);
    }

    async updateOrderItem(userToUpdate: OrderItemModel): Promise<boolean> {
        const updateOrderItemDoc: OrderItem = {} as any;

        if (userToUpdate) {
            updateOrderItemDoc.id = userToUpdate.id;
            updateOrderItemDoc.bookId = userToUpdate.bookId;
            updateOrderItemDoc.orderId = userToUpdate.orderId;
            updateOrderItemDoc.count = userToUpdate.count;
            updateOrderItemDoc.amount = userToUpdate.amount;
        }

        const resRepo = await this.orderItemRepository.updateOrderItem(updateOrderItemDoc);
        if (resRepo) {
            return true;
        }
        throw new HttpException('OrderItem does not exist!', HttpStatus.NOT_FOUND);
    }

    async deleteOrderItem(id: string): Promise<boolean> {
        const delOrderItem: OrderItem = {} as any;
        delOrderItem.id = id;
        const resRepo = await this.orderItemRepository.deleteOrderItem(delOrderItem.id);
        if (!resRepo) {
            throw new HttpException('OrderItem does not exist!', HttpStatus.NOT_FOUND);
        }
        return true;
    }
}
