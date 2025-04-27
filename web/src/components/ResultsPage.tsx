import { Stack, Typography } from '@mui/material';

interface Props {
  results: string[]
}

export function ResultsPage(props: Props) {
  const { results } = props;
  return (
    <Stack alignItems="center" gap={2} sx={{ marginTop: 10 }}>
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        Thank you for completing the diagnostic screener!
      </Typography>
      {results.length && <Typography>Recommended level 2 assessments: {results.join(', ')}</Typography>}
      {!results.length && <Typography variant="h6">
        No further action is needed
      </Typography>}
    </Stack>
  );
}
