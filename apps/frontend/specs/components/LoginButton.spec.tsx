import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginButton from '../../components/LoginButton';

describe('<LoginButton/>', () => {
  it('should show login button', async () => {
    render(<LoginButton />);
    expect(await screen.findByRole('button')).toHaveTextContent('Login');
  });
});
