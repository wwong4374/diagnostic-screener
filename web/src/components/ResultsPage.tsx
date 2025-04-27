import { Stack, Typography } from '@mui/material';

export function ResultsPage() {
  return (
    <Stack alignItems="center" gap={2} sx={{ marginTop: 10 }}>
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        Thank you for completing the assessment!
      </Typography>
    </Stack>
  );
}
