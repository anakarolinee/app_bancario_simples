import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Definir o que o Utilizador tem
interface User {
    id: string;
    name: string;
    email: string;
}

// 2. Definir o formato da Store
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

// 3. Criar a Store com Persistência (para não deslogar ao dar F5)
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (user) => set({ user, isAuthenticated: true }),

            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
