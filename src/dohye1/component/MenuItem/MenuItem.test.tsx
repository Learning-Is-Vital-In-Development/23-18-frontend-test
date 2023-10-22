import { render } from '@testing-library/react';
import MenuItem from '.';
import { formatKrPrice, getSingleMenu } from '../../utils';

describe('메뉴 아이템', () => {
  it('메뉴 아이템을 그리는가?', () => {
    const item = getSingleMenu();
    const itemNode = render(<MenuItem item={item} />);

    // 이렇게 하는게 맞나..?
    expect(itemNode.container).toHaveTextContent(item.title);
    expect(itemNode.container).toHaveTextContent(formatKrPrice(item.price));
  });

  it('이미지를 적절하게 그리는가?', () => {
    const item = getSingleMenu();
    const a = render(<MenuItem item={item} />);

    const imageBox = a.getByRole('img', { name: item.title });

    expect(imageBox).toBeInTheDocument();
    expect(imageBox).toHaveAttribute('src', item.imgUrl);
    expect(imageBox).toHaveAttribute('alt', item.title);
  });
});
