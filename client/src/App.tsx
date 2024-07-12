import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignUpPage } from './pages/sign-up';
import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUpPage />
    </QueryClientProvider>
  );
}

export default App;
