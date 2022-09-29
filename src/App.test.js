import React from "react";
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

afterEach(cleanup)

test('should render the component  on the screen', () => {
  render(<App />);
  expect(screen.getByTestId('filename-input')).toBeInTheDocument();
  expect(screen.getByTestId('filename-input-sub-button')).toBeInTheDocument();
});

test('should have the "Submit" button disabled when initialized', () => {
  render(<App />);
  expect(screen.getByTestId('filename-input-sub-button')).toBeDisabled();
});

test('should App the "Submit" button when a valid input filename is entered', () => {
  render(<App />);
  expect(screen.getByTestId('filename-input-sub-button')).toBeDisabled();
  const input = screen.getByTestId('filename-input');
  fireEvent.change(input, { target: { value: 'order_log0' } });
  expect(screen.getByTestId('filename-input-sub-button')).toBeEnabled();
});

it('should have the "Submit" button disabled if the input filename contains spaces', () => {
  render(<App />);

  const input = screen.getByTestId('filename-input');
  fireEvent.change(input, { target: { value: ' ' } });
  expect(screen.getByTestId('filename-input-sub-button')).toBeDisabled();
});

test('csv block should not be render without any filename entered', async () => {
  render(<App />);
  const addButton = screen.getByTestId('filename-input-sub-button');
  fireEvent.click(addButton);
  expect(await screen.queryByText(/_1.csv/)).toBe(null);
  expect(await screen.queryByText(/_0.csv/)).toBe(null);
});