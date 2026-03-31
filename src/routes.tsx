import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/Login'
import { DashboardPage } from './pages/Dashboard'
import { TransferPage } from './pages/Transfer'
import { PrivateRoute } from './PrivateRoute'

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                index: true, // <--- ADICIONA ESTA LINHA
                element: <DashboardPage />,
            },
            {
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'transfer',
                element: <TransferPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />,
    },
])

