import { Img } from 'src/entities/img.entity';
import { IMG_REPOSITORY } from 'src/constants/constants';

export const imgProviders = [
  {
    provide: IMG_REPOSITORY,
    useValue: Img,
  },
];
