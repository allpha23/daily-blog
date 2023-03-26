import React from 'react';
import { render } from '@testing-library/react';
import Header from '../components/Header';

describe('Testando Header', () => {
  test('se contem 2 links, Login e Resgistrar', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Registrar')).toBeInTheDocument();
  });
});
