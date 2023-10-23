import { render } from '@testing-library/react';
import { MenuOption } from './MenuOption';

describe('MenuOption 컴포넌트 테스트', () => {
  const optionListData = [
    {
      name: '[국내산갈비] 전통 돼지갈비찜',
      isPopular: true,
      description: '1인분에만 밥이 포함되어있습니다 기본구성은 석박지+김+갈비찜입니다',
      review: 215,
      optionSelect: true,
      selectList: [
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
      count: 1,
      image: '음식1.jpg',
      minOrderPrice: 9900,
      totalPrice: 18000,
    },
    {
      name: '스팸구이',
      isPopular: false,
      description: '스팸 4조각, 밥도둑',
      review: 6,
      optionSelect: false,
      selectList: [],
      count: 1,
      image: '음식2.jpg',
      minOrderPrice: 9900,
      totalPrice: 10000,
    },
  ];

  it('옳바르게 렌더링 되는지 확인', () => {
    const { getByText } = render(<MenuOption optionList={optionListData} />);

    expect(getByText('스팸구이')).toBeInTheDocument();
    expect(getByText('[국내산갈비] 전통 돼지갈비찜')).toBeInTheDocument();
  });

  it('인기 메뉴 표시 확인', () => {
    const { getByText } = render(<MenuOption optionList={optionListData} />);

    expect(getByText('인기')).toBeInTheDocument();
  });

  it('가격이 올바르게 표시되는지 확인', () => {
    const { getByText } = render(<MenuOption optionList={optionListData} />);

    expect(getByText('18000')).toBeInTheDocument();
  });
});
