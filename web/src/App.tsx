import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DiagnosticScreener } from './components/DiagnosticScreener';
import { theme } from './theme.js';

export function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <DiagnosticScreener />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
