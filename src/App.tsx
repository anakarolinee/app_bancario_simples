import { RouterProvider } from 'react-router-dom';
import { router } from './routes'; 
import { Toaster } from "@/components/ui/sonner"; // 1. Importe o componente do shadcn
import './App.css';

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* 2. Adicione o Toaster aqui para ele ficar "ouvindo" a aplicação toda */}
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

export default App;
