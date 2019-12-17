
import { ORDERITEM_REPOSITORY } from 'src/constants/constants';
import { OrderItem } from 'src/entities/order-item.entity';

export const orderItemProviders = [
  {
    provide: ORDERITEM_REPOSITORY,
    useValue: OrderItem,
  },
];
