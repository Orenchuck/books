import { Injectable, HttpException, Inject, HttpStatus } from '@nestjs/common';
import { Order } from 'src/entities/order.entity';
import { ORDER_REPOSITORY } from 'src/constants/constants';

@Injectable()
export class OrderRepository {
    constructor(@Inject(ORDER_REPOSITORY) private readonly ordersRepository: typeof Order) {}

    async addOrder(order) {
        try {
            const newOrder = this.ordersRepository.create(order);
            return newOrder;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async getAllOrders(): Promise<Order[]> {
        const orders: Order[] = await this.ordersRepository.findAll<Order>();
        return orders;
    }

    async findOrderById(id: string): Promise<Order> {
        try {
            const order: Order = await this.ordersRepository.findOne({ where: { id }});
            return order;
        } catch { throw new HttpException('Order does not exist!', HttpStatus.NOT_FOUND); }
    }

    async findOrderByUser(userId: string): Promise<Order> {
        const res: Order = await this.ordersRepository.findOne({ where: { userId }});
        return res;
    }
}
