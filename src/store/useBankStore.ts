import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
}

interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: 'income' | 'outcome';
    date: string;
}

interface RecipientDetails {
    name: string;
    account: string;
    bank: string;
    pixKey: string;
}

interface BankState {
    user: User | null;
    balance: number;
    transactions: Transaction[];
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateBalance: (amount: number) => void;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    getRecipientDetails: (title: string) => RecipientDetails;
}

export const useBankStore = create<BankState>()(
    persist(
        (set) => ({
            user: null,
            balance: 5000,
            transactions: [
                {
                    id: '1',
                    title: 'Depósito Inicial',
                    amount: 2000,
                    type: 'income',
                    date: '2026-01-23T13:45:00.000Z', 
                },
                {
                    id: '2',
                    title: 'Compra no Supermercado',
                    amount: 150,
                    type: 'outcome',
                    date: '2026-02-04T14:30:00.000Z',
                },
                {
                    id: '3', // ID único
                    title: 'Venda de Monitor',
                    amount: 600,
                    type: 'income',
                    date: '2026-03-01T20:00:00.000Z',
                },
                {
                    id: '4', // ID único
                    title: 'Bónus Mensal',
                    amount: 500,
                    type: 'income',
                    date: '2026-03-15T08:00:00.000Z', 
                },
            ],
            isAuthenticated: false,

            login: (user) => set({
                user,
                isAuthenticated: true
            }),

            logout: () => set({
                user: null,
                isAuthenticated: false
            }),

            updateBalance: (amount) => set((state) => ({
                balance: state.balance + amount
            })),

            addTransaction: (transaction) => set((state) => {
                const newTransaction: Transaction = {
                    ...transaction,
                    id: Date.now().toString(),
                    date: new Date().toISOString(),
                };
                const balanceChange = transaction.type === 'income' ? transaction.amount : -transaction.amount;
                return {
                    transactions: [...state.transactions, newTransaction],
                    balance: state.balance + balanceChange,
                };
            }),

            getRecipientDetails: (title: string) => {
                const recipients: Record<string, RecipientDetails> = {
                    'João Silva': { name: 'João Silva', account: '12345-6', bank: 'Banco Global', pixKey: 'joao@email.com' },
                    'Maria Santos': { name: 'Maria Santos', account: '65432-1', bank: 'Banco Nacional', pixKey: 'maria@cel.com' },
                    'Empresa XYZ': { name: 'Empresa XYZ Ltda', account: '98765-4', bank: 'Banco Empresarial', pixKey: 'empresa@xyz.com' },
                };
                return recipients[title] || { name: title, account: 'xxxx', bank: 'xxxxxx', pixKey: title };
            },
        }),
        {
            name: 'bank-storage',
        }
    )
);
