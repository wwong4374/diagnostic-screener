import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <Stack alignItems="center" gap={2} sx={{ marginTop: 10 }}>
      <Typography variant="h4">Welcome to Diagnostic Screener</Typography>
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        Click to get started:
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate('/screener')}
      >
        Start
      </Button>
    </Stack>
  );
}
