import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { OrderItemsService } from 'src/services/servicesSql/order-item.service';
import { OrderItemModel } from 'src/models/order-item.model';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UserRole } from 'src/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderItemModel } from 'src/models/create-item.model';

@ApiUseTags('items')
@Controller('items')
@UseGuards(RolesGuard)
export class OrderItemsController {
    constructor(private readonly orderItemsService: OrderItemsService) { }

    @Get()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getAllItems(): Promise<OrderItemModel[]> {
        const items = await this.orderItemsService.getAllOrderItems();
        return items;
    }

    @Get(':itemID')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async findItemById(@Param('itemID') itemID: string): Promise<OrderItemModel> {
        const item = await this.orderItemsService.findOrderItemById(itemID);
        return item;
    }

    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async addItem(@Body() item: CreateOrderItemModel) {
        const newItem = await this.orderItemsService.addOrderItem(item);
        return newItem;
    }

    @Put()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateItem(@Body() itemToUpdate: OrderItemModel) {
        const item = await this.orderItemsService.updateOrderItem(itemToUpdate);
        return item;
    }

    @Delete(':itemID')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async deleteItem(@Param('itemID') itemID: string) {
        const items = await this.orderItemsService.deleteOrderItem(itemID);
        return items;
    }
}
