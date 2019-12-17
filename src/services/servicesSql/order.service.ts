import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderRepository } from 'src/repositories/repoSql/order.repository';
import { OrderModel } from 'src/models/order.model';
import { CreateOrderModel } from 'src/models/create-order.model';
import { Order } from 'src/entities/order.entity';
import { generateUuid } from 'src/common/random.helper';
import { Status } from 'src/enums/status.enum';
import { environment } from 'src/enviroment/enviroment';

const getEnv = environment();
// tslint:disable-next-line: no-var-requires
const stripe = require('stripe')(getEnv.stripe);

@Injectable()
export class OrdersService {
    constructor(
        private orderRepository: OrderRepository,
    ) { }

    async addPayment(order) {
        const res = await stripe.customers
            .create({
                email: order.email,
            })
            .then((customer) => {
                return stripe.customers.createSource(customer.id, {
                    source: order.token,
                });
            })
            .then((source) => {
                const charges = stripe.charges.create({
                    amount: order.amount,
                    currency: order.currency,
                    customer: source.customer,
                });
                return charges;
            });
        return res.id;
    }

    async addOrder(order: CreateOrderModel, payment): Promise<OrderModel> {

        const orderToCreate: Order = {
            id: await generateUuid(),
            userId: order.userId,
            paymentId: payment,
            currency: order.currency,
            amount: order.amount,
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
            newOrder.amount = resRepo.amount;
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
                amount: oneOrder.amount,
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
            order.amount = resRepo.amount;
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
            order.amount = resRepo.amount;
            order.status = resRepo.status;
            order.date = resRepo.date;
            order.isDelete = resRepo.isDelete;
            return order;
        }
        throw new HttpException('Order does not exist!', HttpStatus.NOT_FOUND);
    }
}
