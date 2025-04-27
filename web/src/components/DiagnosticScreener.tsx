import { Alert, CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export function DiagnosticScreener() {
  const {
    data: screener,
    isLoading: isScreenerLoading,
    error: screenerError,
  } = useQuery({
    queryKey: ['screener'],
    queryFn: async () => {
      const response = await fetch('/api/screener');
      if (!response.ok) {
        throw new Error('Failed to fetch screener');
      }
      return await response.json();
    },
  });
  if (isScreenerLoading) {
    return <CircularProgress></CircularProgress>
  }
  if (screenerError) {
    return <Alert>{`Error loading screener: ${screenerError}`}</Alert>;
  }

  return (
    <Stack alignItems="center">
      <Typography variant='h4'>{screener.fullName}</Typography>
    </Stack>
  );
}
