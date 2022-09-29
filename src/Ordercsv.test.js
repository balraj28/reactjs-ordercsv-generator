import { render, screen} from '@testing-library/react';
import Ordercsv from './Ordercsv';
import '@testing-library/jest-dom';

test('should render the csv block with valid CSV data snapshot', () => {
  const csvdata = [
    { prod: 'paint', Avg: '1.0' },
    { prod: 'laptop', Avg: '3.0' }
  ];
  render(<Ordercsv data={csvdata} filename={'order_log'} />);
  expect(screen.getByTestId('file1-csv-data')).toMatchSnapshot();
});

test('should not render the csv block without valid filename', () => {
  const csvdata = [{ prod: 'paint', Avg: '1.0' },
  { prod: 'laptop', Avg: '3.0' }];
  render(<Ordercsv data={csvdata} filename={''} />);
  expect(screen.queryByText(/_0.csv/)).toBe(null);
});

test('should not render the csv block without valid data', () => {
  render(<Ordercsv data={[]} filename={'order_log'} />);
  expect(screen.queryByText(/order_log_0.csv/)).toBe(null);
});

test('should render the download option without valid data', async () => {
  render(<Ordercsv data={[]} filename={''} />);
  expect(screen.queryByText(/Download/)).toBe(null);
});

test('should render the download option with valid data', async () => {
  render(<Ordercsv data={[{ prod: 'paint', Avg: '1.0' }]} filename={'order_log'} />);
  expect(screen.queryByText(/Download/)).toBeInTheDocument();
});
