import React from 'react';
import { render } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import Index from '../../pages/index';

jest.mock('@apollo/client', () => ({ useQuery: jest.fn(), gql: jest.fn() }));
jest.mock('@auth0/auth0-react', () => ({ useAuth0: jest.fn() }));

describe('Index', () => {
  xit('should render successfully', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: { app: { serverTime: '2022' } } });
    (useAuth0 as jest.Mock).mockReturnValue({ user: { name: 'John Doe', picture: '/test.png' } });

    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
