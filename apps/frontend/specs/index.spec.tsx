import React from 'react';
import { render } from '@testing-library/react';

import { useQuery } from '@apollo/client';
import Index from '../pages/index';

jest.mock('@apollo/client', () => ({ useQuery: jest.fn(), gql: jest.fn() }));

describe('Index', () => {
  it('should render successfully', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: { app: { serverTime: '2022' } } });
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
