import { useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useBankStore } from '../../store/useBankStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NumericFormat } from 'react-number-format';
import { ArrowLeft } from 'lucide-react';
import { toast } from "sonner";

const transferSchema = z.object({
    title: z.string().min(3, 'Informe o destinatário ou chave'),
    amount: z.number({ message: "Informe um valor válido" }).positive('O valor deve ser maior que zero'),
});

type TransferFormValues = z.infer<typeof transferSchema>;

export function TransferPage() {
    const navigate = useNavigate();
    const { addTransaction, balance } = useBankStore();
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        control,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<TransferFormValues>({
        resolver: zodResolver(transferSchema),
        defaultValues: { amount: 0, title: '' }
    });

    const watchedTitle = useWatch({ control, name: 'title' });

    const nextStep = async () => {
        const isValid = await trigger('title');
        if (isValid) setStep(2);
    };

    const onSubmit = async (data: TransferFormValues) => {
        if (data.amount > balance) {
            // 2. Toast de Erro (Saldo insuficiente)
            toast.error("Saldo insuficiente", {
                description: "Você não possui saldo o suficiente para está operação."
            });
            return;
        }

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            addTransaction({
                title: data.title,
                amount: data.amount,
                type: 'outcome'
            });

            // 3. Toast de Sucesso
            toast.success("Transferência realizada!", {
                description: `R$ ${data.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} enviado para ${data.title}`
            });

            navigate('/dashboard');
        } catch {
            toast.error("Erro ao transferir", {
                description: "Ocorreu um problema, tente novamente."
            });
        }
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 p-8">

                {(step === 1 || step === 2) && (
                    <button
                        type="button"
                        onClick={() => {
                            if (step === 2) {
                                setStep(1);
                            } else {
                                navigate('/dashboard'); // Sai da página de transferência
                            }
                        }}
                        className="flex items-center text-slate-500 mb-4 hover:text-slate-800 transition-colors group"
                    >
                        <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                        <span>Voltar</span>
                    </button>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {step === 1 && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-slate-900">Para quem você quer transferir?</h1>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 text-left">Nome, CPF/CNPJ ou Chave Pix</label>
                                <Input
                                    {...register('title')}
                                    placeholder="Celular, Email, Pix copia e cola..."
                                    className="mt-2 h-12 text-lg rounded-xl"
                                    autoFocus
                                />
                                {errors.title && <p className="text-md text-gray-600 mt-1 text-left">{errors.title.message}</p>}
                            </div>
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="bg-[#58bd7d] text-[#fcfcfd] hover:brightness-90 rounded-full w-full py-6 text-lg font-semibold cursor-pointer transition-all"
                            >
                                Continuar
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="text-center">
                                <p className="text-sm text-slate-500">Transferindo para <span className="font-bold text-slate-800">{watchedTitle}</span></p>
                                <h1 className="text-2xl font-semibold text-slate-900 mt-1">Quanto você quer transferir?</h1>
                            </div>

                            <div>
                                <Controller
                                    name="amount"
                                    control={control}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <NumericFormat
                                            getInputRef={ref}
                                            customInput={Input}
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            prefix="R$ "
                                            decimalScale={2}
                                            fixedDecimalScale
                                            autoFocus
                                            placeholder="R$ 0,00"
                                            value={value === 0 ? '' : value}
                                            onValueChange={(values) => onChange(values.floatValue || 0)}
                                            isAllowed={(values) => (values.value.length <= 11)}
                                            className="mt-1 w-full !text-4xl placeholder:text-slate-200 font-bold h-32 text-center border-none focus-visible:ring-0 bg-transparent shadow-none"
                                        />
                                    )}
                                />
                                <p className="text-center text-sm text-slate-500 mt-2">Saldo disponível: R$ {balance.toLocaleString()}</p>
                                {errors.amount && <p className="text-md text-gray-600 text-center mt-1">{errors.amount.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#58bd7d] text-[#fcfcfd] hover:brightness-90 rounded-full w-full py-6 text-lg font-semibold cursor-pointer transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processando...' : 'Confirmar Transferência'}
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
