import { render, screen, waitFor } from '@testing-library/react';
import Stack from './Stack';
import userEvent from '@testing-library/user-event';

describe('Rendering', () => {
  const elements = ['a', 'b', 'c'];

  it('should render a, b, c list items', () => {
    render(<Stack elements={elements} />);
    const listItems = screen.getAllByRole('listitem');

    listItems.forEach((listItem, index) => {
      expect(listItem).toHaveTextContent(elements[index]);
    });
  });

  it('should render pop button', () => {
    render(<Stack elements={elements} />);
    expect(screen.getByRole('button', { name: 'pop' })).toBeInTheDocument();
  });
});

describe('pop 클릭', () => {
  const elements = ['a', 'b', 'c'];

  it('click pop button one time', async () => {
    render(<Stack elements={elements} />);

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'pop' });
    await user.click(button);

    elements.pop();

    await waitFor(() => {
      const listItemC = screen.queryByText('c');
      expect(listItemC).not.toBeInTheDocument();
    });

    const listItems = screen.getAllByRole('listitem');

    listItems.forEach((listItem, index) => {
      expect(listItem).toHaveTextContent(elements[index]);
    });
  });
});
