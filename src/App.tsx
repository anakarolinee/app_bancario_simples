import { RouterProvider } from 'react-router-dom';
import { router } from './routes'; 
import { Toaster } from "@/components/ui/sonner"; 
import './App.css';

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

export default App;
