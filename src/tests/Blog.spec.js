import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../pages/Blog';

describe('Testando Blog', () => {
    test('se conteu um titulo e um subtitulo', async () => {
        const { getByRole, getByText } = render(<Blog />);

        expect(getByRole('heading', { name: /Daily Blog/i, level: 1 })).toBeInTheDocument();
        expect(getByText('um lugar incrível para se tornar produtivo e entretido por meio de atualizações diárias')).toBeInTheDocument();
    });

    test('se existe blogs', async () => {
        const { findAllByRole } = render(<Blog />);

        expect(await findAllByRole('heading', { level: 4 })).not.toHaveLength(0);
    });

    test('se ao clicar no blog exibe os comentários', async () => {
        const { findAllByRole, findByRole } = render(<Blog />);

        const blog = await findAllByRole('heading', { level: 4 });

        userEvent.click(blog[0]);

        expect(await findByRole('button', { name: 'Comentar' })).toBeInTheDocument();
    });
});
