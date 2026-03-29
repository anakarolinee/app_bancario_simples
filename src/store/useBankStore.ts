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

interface BankState {
    user: User | null;
    balance: number;
    transactions: Transaction[];
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateBalance: (amount: number) => void;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
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
                    amount: 500,
                    type: 'income',
                    date: '2026-10-01T10:00:00.000Z',
                },
                {
                    id: '2',
                    title: 'Compra no Supermercado',
                    amount: 150,
                    type: 'outcome',
                    date: '2026-10-02T14:30:00.000Z',
                },
                {
                    id: '3',
                    title: 'Depósito Inicial',
                    amount: 500,
                    type: 'income',
                    date: '2026-10-01T10:00:00.000Z',
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
        }),
        {
            name: 'bank-storage',
        }
    )
);
