import { render, screen } from '@testing-library/react';
import { CartItem } from './CartItem';
import { Menu } from '../type';

describe('CardItem Component', () => {
  const foodInfoWithoutRecommendation: Menu = {
    name: '[꼬마] 새우마요김밥',
    description: '고소한 새우튀김과 특제 마요소스',
    options: [
      {
        name: '2줄',
        price: 2700,
      },
    ],
    image: './asset/img.jpeg',
    isPopular: false,
    tags: [''],
  };

  test('renders price with priceDetail when priceDetail is present', () => {
    render(<CartItem menu={foodInfoWithoutRecommendation} />);

    const badgeElement = screen.queryByText('사장님 추천');

    // recommendOfOwner가 false인 경우, badgeElement가 null임을 확인
    expect(badgeElement).toBeNull();
  });

  const foodInfoWithRecommendation: Menu = {
    name: '[꼬마] 새우마요김밥',
    description: '고소한 새우튀김과 특제 마요소스',
    options: [
      {
        price: 2700,
      },
    ],
    image: './asset/img.jpeg',
    isPopular: true,
    tags: [''],
  };

  test('renders "사장님 추천" when recommendOfOwner is true', () => {
    render(<CartItem menu={foodInfoWithRecommendation} />);

    const badgeElement = screen.getByText('사장님 추천');

    // recommendOfOwner가 true인 경우, badgeElement가 렌더링됨을 확인
    expect(badgeElement).toBeInTheDocument();
  });
});
