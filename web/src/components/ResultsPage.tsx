import { Stack, Typography } from '@mui/material';

interface Props {
  results: string[];
}

export function ResultsPage(props: Props) {
  const { results } = props;
  return (
    <Stack alignItems="center" gap={2} sx={{ marginTop: 10 }}>
      <Typography variant="h5" fontWeight={600} sx={{ marginTop: 10, marginBottom: 5 }}>
        Thank you for completing the diagnostic screener!
      </Typography>
      {results.length ? (
        <Stack alignItems="center" gap={2} sx={{ width: 800 }}>
          <Typography variant="h6">
            Based on your screening results, we recommend these level 2
            assessments:
          </Typography>
          <Typography variant="h6" textAlign="center" fontWeight={600}>
            {results.join(', ')}  
          </Typography>
          <Typography variant="h6" textAlign="center">
            Please contact your provider for further information.
          </Typography>
        </Stack>
      ) : (
        <Typography variant="h6">No further action is needed</Typography>
      )}
    </Stack>
  );
}
