import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <Stack alignItems="center" gap={6} sx={{ marginTop: 10 }}>
      <Typography variant="h4" fontWeight={600}>Welcome to Diagnostic Screener</Typography>
      <Typography
        variant="h5"
        sx={{
          maxWidth: 650,
        }}
      >
        Complete this quick screener so we can better support your mental
        health.
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
