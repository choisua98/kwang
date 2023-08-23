import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as JotaiProvider } from 'jotai';
import Router from './shared/Router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <Router />
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default App;
