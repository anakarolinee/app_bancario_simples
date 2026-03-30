import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { TransferPage } from './index';
import { useBankStore } from '../../store/useBankStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Simula a store do banco para controlar o saldo e as funções
vi.mock('../../store/useBankStore', () => ({
    useBankStore: vi.fn(),
}));

// Simula o hook de navegação do react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Simula as notificações (toast) de sucesso e erro
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('TransferPage', () => {
    beforeEach(() => {

        vi.clearAllMocks();

        // Define um saldo inicial de 1000 para a store simulada
        vi.mocked(useBankStore).mockReturnValue({
            addTransaction: vi.fn().mockResolvedValue(true),
            balance: 1000,
            getRecipientDetails: vi.fn((title) => ({
                name: title,
                account: '12345-6',
                bank: 'Banco Global',
                pixKey: 'test@email.com'
            })),
        });
    });

    it('should complete the transfer flow correctly', async () => {

        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <TransferPage />
            </BrowserRouter>
        );

        // step 1: Identificação do destinatário
        const titleInput = screen.getByPlaceholderText('Celular, Email, Pix copia e cola...');
        await user.type(titleInput, 'João Silva');

        // Clica no botão "Continuar" para avançar de etapa
        const continueButton = screen.getByRole('button', { name: /continuar/i });
        await user.click(continueButton);

        // step 2: Confirmação do destinatário
        await waitFor(() => {
            expect(screen.getByText('Confirme o destinatário')).toBeInTheDocument();
            expect(screen.getByText('João Silva')).toBeInTheDocument();
        });

        // Clica no botão "Confirmar e Continuar" para avançar para o valor
        const confirmRecipientButton = screen.getByRole('button', { name: /confirmar e continuar/i });
        await user.click(confirmRecipientButton);

        // step 3: Definição do valor e Validação visual
        await waitFor(() => {
            expect(screen.getByText('Quanto você quer transferir?')).toBeInTheDocument();
        });

        // Localiza o campo de valor (input numérico) e digita a quantia
        const amountInput = screen.getByDisplayValue('');
        await user.type(amountInput, '500,00');

        // Clica no botão de confirmação para finalizar a transferência
        const confirmButton = screen.getByRole('button', { name: /confirmar transferência/i });
        await user.click(confirmButton);

        await waitFor(() => {
            console.log("Chamadas do navigate:", mockNavigate.mock.calls);
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
            }, { timeout: 3000 }); 
    });
});
