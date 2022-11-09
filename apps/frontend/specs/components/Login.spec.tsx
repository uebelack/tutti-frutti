import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../components/Login';

describe('<Login/>', () => {
  it('should show login button', async () => {
    render(<Login />);
    expect(await screen.findByRole('button')).toHaveTextContent('Login');
  });
});
