import { render } from '@testing-library/react';

import { Menu } from '../type';
import MenuForm from './Menuform';

describe('Test Menu with full Data', () => {
  const MenuDataWithPriceList: Menu = {
    title: `[국내산갈비] 전통 돼지 갈비찜`,
    description: `1인분에만 밥이 포함되어있습니다 기본 구성은 석박지+김+갈비찜입니다 소(2~3인분)`,
    images: ['./asset/img.jpeg', './asset/img.jpeg'],
    minPriceNum: 9900,
    isPopular: true,
    options: [
      {
        name: '1인분(밥포함)',
        price: 18000,
      },
      {
        name: '소(2~3인분)',
        price: 30000,
      },
      {
        name: '중(3~4인분)',
        price: 45000,
      },
    ],
  };

  it('test with full data', () => {
    render(<MenuForm menu={MenuDataWithPriceList} />);
  });
});

describe('Test Menu without full Data', () => {
  const MenuDataWithoutPriceList: Menu = {
    title: `스팸구이`,
    description: `스팸 4조각
    밥도둑`,
    images: [''],
    minPriceNum: 9900,
    options: [
      {
        price: 5000,
      },
    ],
    isPopular: false,
  };

  it('should render hidden', () => {
    render(<MenuForm menu={MenuDataWithoutPriceList} />);
  });
});
