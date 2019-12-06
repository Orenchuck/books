import { Injectable, HttpException, Inject, HttpStatus } from '@nestjs/common';
import { OrderItem } from 'src/entities/order-item.entity';
import { ORDERITEM_REPOSITORY } from 'src/constants/constants';

@Injectable()
export class OrderItemRepository {
    constructor(@Inject(ORDERITEM_REPOSITORY) private readonly orderItemsRepository: typeof OrderItem) {}

    async addOrderItem(item) {
        try {
            const newItem = this.orderItemsRepository.create(item);
            return newItem;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async getAllOrderItems(): Promise<OrderItem[]> {
        const items: OrderItem[] = await this.orderItemsRepository.findAll<OrderItem>();
        return items;
    }

    async findOrderItemById(id: string): Promise<OrderItem> {
        try {
            const item: OrderItem = await this.orderItemsRepository.findOne({ where: { id }});
            return item;
        } catch { throw new HttpException('Item does not exist!', HttpStatus.NOT_FOUND); }
    }

    async updateOrderItem(item: OrderItem): Promise<any[]> {
        try {
            const updatedItem = await this.orderItemsRepository.update(item, {where: {id: item.id}});
            return updatedItem;
        } catch { throw new HttpException('Item does not exist!', HttpStatus.NOT_FOUND); }
    }

    async saveOrderItem(item): Promise<boolean> {
        try {
            await item.save();
            return true;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async deleteOrderItem(id: string) {
        const result = await this.orderItemsRepository.destroy({ where: { id }});
        return result;
    }
}
