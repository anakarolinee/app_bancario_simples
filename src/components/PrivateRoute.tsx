import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from "@/components/ui/button";
import { Sparkles, LogOut } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const PrivateRoute = () => {
    const { isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAuthenticated) {
        return <Navigate replace to="/login" />;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm rounded-b-[40px] border-b border-slate-100 p-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-[#58bd7d] fill-[#58bd7d]" />
                            <h1 className="text-xl font-semibold text-slate-900">
                                AKDev <span className="font-light text-slate-400">Bank</span>
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full border-slate-200"
                                    >
                                        <LogOut className="h-4 w-4 text-slate-600" />
                                        <span className="sr-only">Sair</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-[24px]">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Isto irá terminar a tua sessão atual e terás de fazer login novamente para aceder à tua conta.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-full cursor-pointer">Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleLogout}
                                            className="rounded-full cursor-pointer bg-red-700 hover:bg-red-800"
                                        >
                                            Sair da Conta
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    );
};
