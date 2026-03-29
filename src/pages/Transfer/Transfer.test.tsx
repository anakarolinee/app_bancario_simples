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
        // Limpa todos os mocks antes de cada teste
        vi.clearAllMocks();

        // Define um saldo inicial de 1000 para a store simulada
        vi.mocked(useBankStore).mockReturnValue({
            addTransaction: vi.fn().mockResolvedValue(true),
            balance: 1000,
        });
    });

    it('should complete the transfer flow correctly', async () => {
        // Configura o disparador de eventos do usuário (clique, digitação, etc)
        const user = userEvent.setup();

        // Renderiza a página dentro de um Router para suportar navegação
        render(
            <BrowserRouter>
                <TransferPage />
            </BrowserRouter>
        );

        // PASSO 1: Identificação do destinatário
        // Busca o campo pelo texto de ajuda (placeholder) e digita o nome
        const titleInput = screen.getByPlaceholderText('Celular, Email, Pix copia e cola...');
        await user.type(titleInput, 'Ana Karoline');

        // Clica no botão "Continuar" para avançar de etapa
        const continueButton = screen.getByRole('button', { name: /continuar/i });
        await user.click(continueButton);

        // PASSO 2: Definição do valor e Validação visual
        // Aguarda a interface mudar e verifica se o título e o nome do destinatário aparecem
        await waitFor(() => {
            expect(screen.getByText('Quanto você quer transferir?')).toBeInTheDocument();
            expect(screen.getByText(/Ana Karoline/i)).toBeInTheDocument();
        });

        // Localiza o campo de valor (input numérico) e digita a quantia
        const amountInput = screen.getByDisplayValue('');
        await user.type(amountInput, '500,00');

        // PASSO 3: Confirmação final
        // Clica no botão de confirmação para finalizar a transferência
        const confirmButton = screen.getByRole('button', { name: /confirmar transferência/i });
        await user.click(confirmButton);

        await waitFor(() => {
            // Se falhar, o Vitest imprime no terminal quantas vezes foi chamado
            console.log("Chamadas do navigate:", mockNavigate.mock.calls);
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
            }, { timeout: 3000 }); 
    });
});
