import { ORDER_REPOSITORY } from 'src/constants/constants';
import { Order } from 'src/entities/order.entity';

export const orderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
];
