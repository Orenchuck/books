import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderRepository } from 'src/repositories/repoSql/order.repository';
import { OrderModel } from 'src/models/order.model';
import { CreateOrderModel } from 'src/models/create-order.model';
import { Order } from 'src/entities/order.entity';
import { generateUuid } from 'src/common/random.helper';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class OrdersService {
    constructor(
        private orderRepository: OrderRepository,
    ) { }

    async addOrder(order: CreateOrderModel): Promise<OrderModel> {
        const orderToCreate: Order = {
            id: await generateUuid(),
            userId: order.userId,
            paymentId: order.paymentId,
            currency: order.currency,
            status: Status.NewOrder,
            date: new Date(),
            isDelete: false,
        } as any;
        const resRepo: Order = await this.orderRepository.addOrder(orderToCreate);
        const newOrder: OrderModel = {};
        if (resRepo) {
            newOrder.id = resRepo.id;
            newOrder.userId = resRepo.userId;
            newOrder.paymentId = resRepo.paymentId;
            newOrder.currency = resRepo.currency;
            newOrder.status = resRepo.status;
            newOrder.date = resRepo.date;
            newOrder.isDelete = resRepo.isDelete;
        }
        return newOrder;
    }

    async getAllOrders(): Promise<OrderModel[]> {
        const orders: Order[] = await this.orderRepository.getAllOrders();
        if (!orders) {
            throw new HttpException('You have no orders', HttpStatus.NOT_FOUND);
        }
        const allOrders: OrderModel[] = [];
        for (const oneOrder of orders) {
            const order: OrderModel = {
                id: oneOrder.id,
                userId: oneOrder.userId,
                paymentId: oneOrder.paymentId,
                currency: oneOrder.currency,
                status: oneOrder.status,
                date: oneOrder.date,
                isDelete: oneOrder.isDelete,
            };
            allOrders.push(order);
        }
        return allOrders;
    }

    async findOrderById(id: string): Promise<OrderModel> {
        const order: OrderModel = {};
        const resRepo: Order = await this.orderRepository.findOrderById(id);

        if (resRepo) {
            order.id = resRepo.id;
            order.userId = resRepo.userId;
            order.paymentId = resRepo.paymentId;
            order.currency = resRepo.currency;
            order.status = resRepo.status;
            order.date = resRepo.date;
            order.isDelete = resRepo.isDelete;
            return order;
        }
        throw new HttpException('Order does not exist!', HttpStatus.NOT_FOUND);
    }

    async findOrderByUser(userId: string): Promise<OrderModel> {
        const order: OrderModel = {};
        const resRepo: Order = await this.orderRepository.findOrderByUser(userId);
        if (resRepo) {
            order.id = resRepo.id;
            order.userId = resRepo.userId;
            order.paymentId = resRepo.paymentId;
            order.currency = resRepo.currency;
            order.status = resRepo.status;
            order.date = resRepo.date;
            order.isDelete = resRepo.isDelete;
            return order;
        }
        throw new HttpException('Order does not exist!', HttpStatus.NOT_FOUND);
    }

    async updateOrder(userToUpdate: OrderModel): Promise<boolean> {
        const updateOrderDoc: Order = {} as any;

        if (userToUpdate) {
            updateOrderDoc.id = userToUpdate.id;
            updateOrderDoc.paymentId = userToUpdate.paymentId;
            updateOrderDoc.userId = userToUpdate.userId;
            updateOrderDoc.currency = userToUpdate.currency;
            updateOrderDoc.status = userToUpdate.status;
            updateOrderDoc.date = userToUpdate.date;
        }

        const resRepo = await this.orderRepository.updateOrder(updateOrderDoc);
        if (resRepo) {
            return true;
        }
        throw new HttpException('Order does not exist!', HttpStatus.NOT_FOUND);
    }

    async isDeleteOrder(id: string): Promise<boolean> {
        const orderFromDb: Order = await this.orderRepository.findOrderById(id);

        if (orderFromDb) {
            orderFromDb.isDelete = !orderFromDb.isDelete;
            const savedOrder: boolean = await this.orderRepository.saveOrder(orderFromDb);
            return savedOrder;
        }
        throw new HttpException('Order does not exist!', HttpStatus.NOT_FOUND);
    }

    async deleteOrder(id: string): Promise<boolean> {
        const delOrder: Order = {} as any;
        delOrder.id = id;
        const resRepo = await this.orderRepository.deleteOrder(delOrder.id);
        if (!resRepo) {
            throw new HttpException('Order does not exist!', HttpStatus.NOT_FOUND);
        }
        return true;
    }
}
