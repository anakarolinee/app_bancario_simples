import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from "lucide-react";

// 1. Schema de Validação com Zod
const loginSchema = z.object({
    email: z.string().email('Insere um email válido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);

    // 2. Setup do Form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const watchedEmail = watch('email');
    const watchedPassword = watch('password');

    // 3. Simulação de Login (Mock)
    const onSubmit = async (data: LoginFormValues) => {
        // Simula um delay de rede
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock de sucesso: salva na store e redireciona
        login({ id: '1', name: 'Ana', email: data.email });
        navigate('/dashboard');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg border border-slate-200">
                <div className="text-center">
                        <div className="items-center">
                            <div className='justify-center flex'>
                            <Sparkles className="h-6 w-6 text-[#58bd7d] fill-[#58bd7d]" />
                            </div>
                            <h1 className="text-xl font-semibold text-slate-900">
                                AKDev <span className="font-light text-slate-400">Bank</span>
                            </h1>
                        </div>  
                    <p className="text-sm text-slate-500">Introduza os seus dados abaixo e faça login</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <Input
                            {...register('email')}
                            className="mt-1 block w-full rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                            placeholder="exemplo@email.com"
                        />
                        {errors.email && <span className="text-md text-gray-600">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700">Senha</label>
                        <div className="relative">
                            <Input
                                {...register('password')}
                                type={showPassword ? "text" : "password"}
                                className="mt-1 block w-full rounded-md pl-3 pr-10 py-2  focus:border-blue-500 focus:outline-none"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && <span className="text-md text-gray-600">{errors.password.message}</span>}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting || !watchedEmail || !watchedPassword}
                        className="bg-[#58bd7d] text-[#fcfcfd] hover:brightness-90 rounded-full w-full py-4 font-semibold cursor-pointer"                    >
                        {isSubmitting ? 'A carregar...' : 'Entrar'}
                    </Button>

                </form>
                <div className="text-center">
                    <span className="text-sm text-gray-800">Exemplo de Login</span>

                    <hr className="my-2 border-gray-200" />

                    <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium text-gray-900">Email:</span> admin@exemplo.com</p>
                        <p><span className="font-medium text-gray-900">Senha:</span> 12345678</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
