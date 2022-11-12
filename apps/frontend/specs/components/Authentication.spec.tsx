import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Authentication from '../../components/auth/Authentication';

jest.mock('@auth0/auth0-react', () => ({ useAuth0: jest.fn() }));

describe('<Authentication/>', () => {
  it('should show loader', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({ isLoading: true });
    render(
      <Authentication>
        <div>Test</div>
      </Authentication>,
    );
    expect(await screen.findByText('loading...')).toBeInTheDocument();
  });

  it('should show login button', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({});
    render(
      <Authentication>
        <div>Test</div>
      </Authentication>,
    );
    expect(await screen.findByRole('button')).toHaveTextContent('Login');
  });

  it('should show children', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({ isAuthenticated: true });
    render(
      <Authentication>
        <div>Test</div>
      </Authentication>,
    );
    expect(await screen.findByText('Test')).toBeInTheDocument();
  });
});
