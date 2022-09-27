import { render } from '@testing-library/react';
import App from './App';

describe('Test Suite', () => {
  test('renderring correctly', () => {
    const wrapper = render(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renderring header element correctly', () => {
    const { getByTestId } = render(<App />);
    const result_header = getByTestId('result')
    expect(result_header).toBeInTheDocument();
  });
});

