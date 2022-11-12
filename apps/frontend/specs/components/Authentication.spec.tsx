import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationCheckProvider from '../../components/AuthenticationCheckProvider';

jest.mock('@auth0/auth0-react', () => ({ useAuth0: jest.fn() }));

describe('<AuthenticationCheckProvider/>', () => {
  it('should show loader', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({ isLoading: true });
    render(
      <AuthenticationCheckProvider>
        <div>Test</div>
      </AuthenticationCheckProvider>
    );
    expect(await screen.findByText('loading...')).toBeInTheDocument();
  });

  it('should show login button', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({});
    render(
      <AuthenticationCheckProvider>
        <div>Test</div>
      </AuthenticationCheckProvider>
    );
    expect(await screen.findByRole('button')).toHaveTextContent('Login');
  });

  it('should show children', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({ isAuthenticated: true });
    render(
      <AuthenticationCheckProvider>
        <div>Test</div>
      </AuthenticationCheckProvider>
    );
    expect(await screen.findByText('Test')).toBeInTheDocument();
  });
});
