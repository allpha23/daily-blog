import React from 'react';
import { render } from '@testing-library/react';
import BlogItem from '../components/BlogItem';
import { blog, users } from './mocks/index';

describe('Testando BlogItem', () => {
    test('se possui titulo e nome de usuário', () => {
        const { getByRole, getByText } = render(<BlogItem blog={blog} users={users} commentsOn={() => { }} />);

        expect(getByRole('heading', { level: 4 })).toBeInTheDocument();
        expect(getByText('Bret')).toBeInTheDocument();
    });
});