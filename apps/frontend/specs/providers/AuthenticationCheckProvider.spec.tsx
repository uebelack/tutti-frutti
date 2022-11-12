import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import AuthenticationCheckProvider from '../../components/providers/AuthenticationCheckProvider';

jest.mock('@auth0/auth0-react', () => ({ useAuth0: jest.fn() }));
jest.mock('next/router', () => ({ useRouter: jest.fn() }));

describe('<AuthenticationCheckProvider/>', () => {
  it('should show loader', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({ isLoading: true });
    (useRouter as jest.Mock).mockReturnValue({});
    render(
      <AuthenticationCheckProvider>
        <div>Test</div>
      </AuthenticationCheckProvider>,
    );
    expect(await screen.findByText('loading...')).toBeInTheDocument();
  });

  it('should redirect to login', async () => {
    const replace = jest.fn();
    (useAuth0 as jest.Mock).mockReturnValue({});
    (useRouter as jest.Mock).mockReturnValue({ replace });
    render(
      <AuthenticationCheckProvider>
        <div>Test</div>
      </AuthenticationCheckProvider>,
    );
    expect(replace).toHaveBeenCalledWith('/login');
  });

  it('should show children', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({ isAuthenticated: true });
    (useRouter as jest.Mock).mockReturnValue({});
    render(
      <AuthenticationCheckProvider>
        <div>Test</div>
      </AuthenticationCheckProvider>,
    );
    expect(await screen.findByText('Test')).toBeInTheDocument();
  });
});
