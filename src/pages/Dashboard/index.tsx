import { Link } from 'react-router-dom';
import { useBankStore } from '@/store/useBankStore';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Plus, SendHorizontal } from 'lucide-react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
export function DashboardPage() {

    const { balance, transactions, user } = useBankStore();
    const [showBalance, setShowBalance] = useState(true);

    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const formatCurrency = (value: number) => {
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">

            {/* Header com Saudação e Logout (Opcional) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        Olá, {user?.name || 'AKDever'}
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm">Bem-vindo ao seu banco digital.</p>
                </div>

                <Button
                    asChild
                    className="w-full sm:w-auto group bg-slate-600 hover:bg-indigo-700 text-white font-semibold rounded-xl sm:rounded-full p-5 sm:p-6 shadow-lg shadow-slate-200 transition-all active:scale-95 overflow-hidden border-none"
                >
                    <Link to="/transfer">
                        <span className="flex items-center justify-center gap-2 relative w-full">
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0">
                                <Plus size={20} className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-50 sm:size-[22px]" />
                                <SendHorizontal size={20} className="absolute opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 text-emerald-400 sm:size-[22px]" />
                            </div>

                            {/* Texto Curto: Aparece apenas em telas pequenas (abaixo de 640px) */}
                            <span className="text-base block sm:hidden">Transferir</span>

                            {/* Texto Longo: Escondido em mobile, aparece do 'sm' para cima */}
                            <span className="text-lg hidden sm:block">Pix e Transfererir</span>
                        </span>
                    </Link>
                </Button>
            </div>


            {/* Card de Saldo Usando o Componente Card do Shadcn */}
            <Card className="border-none shadow-md bg-[#58bd7d]">
                <CardHeader className=" flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-white uppercase tracking-wide">
                        Saldo Total
                    </CardTitle>
                    <Button
                        variant="ghost"
                        onClick={() => setShowBalance(!showBalance)}
                        className="hover:bg-transparent  cursor-pointer hover:text-white/80 active:scale-90 transition-all"
                    >
                        {showBalance ? (
                            <EyeOff className="h-8 w-8 text-white" />
                        ) : (
                            <Eye className="h-8 w-8 text-white" />
                        )}
                    </Button>
                </CardHeader>
                <CardContent>
                    <h2 className="text-4xl font-semibold text-white">
                        {showBalance ? formatCurrency(balance) : '••••••'}
                    </h2>
                </CardContent>
            </Card>

            {/* Lista de Transações */}
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Histórico de Transações</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {sortedTransactions.length === 0 ? (
                        <p className="p-8 text-center text-slate-400">Nenhuma transação encontrada.</p>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {sortedTransactions.map((t) => (
                                <div key={t.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        {/* ÍCONE DE STATUS */}
                                        <div className={`p-2 rounded-full ${t.type === 'income'
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'bg-gray-50 text-gray-400'
                                            }`}>
                                            {t.type === 'income' ? (
                                                <ArrowDownCircle size={20} />
                                            ) : (
                                                <ArrowUpCircle size={20} />
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <p className="font-medium text-slate-800 leading-none">{t.title}</p>
                                            <p className="text-xs text-slate-500">
                                                {new Date(t.date).toLocaleDateString('pt-BR', {
                                                    day: '2-digit',
                                                    month: 'long'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className={`font-semibold text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
