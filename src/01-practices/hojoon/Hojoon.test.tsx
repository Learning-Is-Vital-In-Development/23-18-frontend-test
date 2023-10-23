import { render, screen } from '@testing-library/react';
import { Hojoon } from './Hojoon';
describe('Example', () => {
  it('should render without crashing', () => {
    render(<Hojoon />);

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
