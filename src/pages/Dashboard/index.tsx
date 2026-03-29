import { Link } from 'react-router-dom';
import { useBankStore } from '@/store/useBankStore';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Plus, SendHorizontal } from 'lucide-react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { Globe, Zap, ArrowRight, Bitcoin } from 'lucide-react';

export function DashboardPage() {

    const { balance, transactions, user } = useBankStore();
    const [showBalance, setShowBalance] = useState(true);

    // B - A = Mais recentes (maior timestamp) primeiro
    const sortedTransactions = [...transactions].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );


    const formatCurrency = (value: number) => {

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (date: string) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const transactionDate = new Date(date);

        // Formata a hora separadamente para reutilizar
        const timeString = transactionDate.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        if (transactionDate.toDateString() === today.toDateString()) {
            return `hoje às ${timeString}`; // Agora inclui a hora
        } else if (transactionDate.toDateString() === yesterday.toDateString()) {
            return `ontem às ${timeString}`; // Agora inclui a hora
        } else {
            return transactionDate.toLocaleString('pt-BR', {
                day: '2-digit',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">

            {/* Header com Saudação e Logout (Opcional) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        Olá, {user?.name || 'AKDever'}
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-sm">Bem-vindo ao seu banco digital.</p>
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
            <Card className="border-none overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
                <CardContent className="p-6 sm:p-8 relative">
                    {/* Elemento Decorativo de Fundo (Círculo de Brilho) */}
                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <div className="space-y-4 text-center md:text-left flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                <Zap size={14} className="fill-emerald-400" />
                                Novo: Conta Global + Cripto
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                                O mundo na sua mão, <br />
                                <span className="text-emerald-400">ativos digitais</span> no seu bolso.
                            </h2>

                            <p className="text-slate-400 text-sm sm:text-base max-w-md">
                                Converta Real para Dólar ou Cripto instantaneamente com as menores taxas do mercado global.
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-full px-6 transition-all active:scale-95">
                                    Explorar Cripto
                                </Button>
                                <Button variant="ghost" className="text-white hover:bg-white/10 gap-2">
                                    Saber mais <ArrowRight size={18} />
                                </Button>
                            </div>
                        </div>

                        {/* Ícones/Visual do Lado Direito */}
                        <div className="hidden sm:flex items-center justify-center relative w-32 h-32 md:w-40 md:h-40">
                            <div className="absolute animate-pulse">
                                <Globe size={80} className="text-indigo-400/20" />
                            </div>
                            <div className="bg-slate-800 p-4 rounded-2xl border border-white/10 shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500">
                                <Bitcoin size={48} className="text-emerald-400" />
                            </div>
                        </div>
                    </div>
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
                                                {formatDate(t.date)}
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
