import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from 'src/services/servicesSql/order.service';
import { OrderModel } from 'src/models/order.model';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UserRole } from 'src/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderModel } from 'src/models/create-order.model';

@ApiUseTags('orders')
@Controller('orders')
@UseGuards(RolesGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getAllOrders(): Promise<OrderModel[]> {
        const orders = await this.ordersService.getAllOrders();
        return orders;
    }

    @Get(':orderID')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async findOrderById(@Param('orderID') orderID: string): Promise<OrderModel> {
        const order = await this.ordersService.findOrderById(orderID);
        return order;
    }

    @Get('user/:user')
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async findOrderByUser(@Param('user') userId: string): Promise<OrderModel> {
        const order = await this.ordersService.findOrderByUser(userId);
        return order;
    }

    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async addOrder(@Body() order: CreateOrderModel) {
        const newOrder = await this.ordersService.addOrder(order);
        return newOrder;
    }

    @Put()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateOrder(@Body() orderToUpdate: OrderModel) {
        const order = await this.ordersService.updateOrder(orderToUpdate);
        return order;
    }

    @Get('del/:id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async isDelOrder(@Param('id') id: string): Promise<boolean> {
        const delOrder = await this.ordersService.isDeleteOrder(id);
        return delOrder;
    }

    @Delete(':orderID')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async deleteOrder(@Param('orderID') orderID: string) {
        const orders = await this.ordersService.deleteOrder(orderID);
        return orders;
    }
}
