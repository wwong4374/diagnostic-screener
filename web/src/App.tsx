import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LandingPage } from './components/LandingPage.js';
import { Questions } from './components/Questions.js';
import { theme } from './theme.js';

export function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100vh',
              width: '100%',
            }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/screener" element={<Questions />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
