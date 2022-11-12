import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import LogoutButton from '../../components/auth/LogoutButton';

jest.mock('@auth0/auth0-react', () => ({ useAuth0: jest.fn() }));

describe('<LogoutButton/>', () => {
  it('should show logout button', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({});
    render(<LogoutButton />);
    expect(await screen.findByRole('button')).toHaveTextContent('Logout');
  });

  it('should logout onClick', async () => {
    const auth = { logout: jest.fn() };
    (useAuth0 as jest.Mock).mockReturnValue(auth);

    render(<LogoutButton />);
    await userEvent.click(await screen.findByRole('button'));
    expect(auth.logout).toBeCalledWith({ returnTo: 'http://localhost' });
  });
});
