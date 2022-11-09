import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../components/Loader';
import '@testing-library/jest-dom';

describe('<Loader/>', () => {
  it('should render', async () => {
    render(<Loader />);
    expect(await screen.findByText('loading...')).toBeInTheDocument();
  });
});
