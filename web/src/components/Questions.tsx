import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export function Questions() {
  const navigate = useNavigate();
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
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
    return <CircularProgress />;
  }
  if (screenerError) {
    return <Alert>{`Error loading screener: ${screenerError}`}</Alert>;
  }
  if (!screener?.content?.sections?.length) {
    return <Alert severity="error">Received empty screener!</Alert>;
  }
  const currentSection = screener.content.sections[sectionIndex];
  const currentQuestion = currentSection?.questions[questionIndex];

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={4}
      sx={{
        minHeight: '100vh',
      }}
    >
      <Typography variant="h5">{screener.fullName}</Typography>
      {currentSection && (
        <Typography variant="h6">{currentSection.title}</Typography>
      )}
      {currentQuestion && (
        <Typography variant="body1">{currentQuestion.title}</Typography>
      )}
      <Stack gap={2} flexDirection="column">
        {currentSection &&
          currentSection.answers.map((answer: Record<string, any>) => (
            <Button
              key={answer.value}
              variant="contained"
              onClick={() => {
                if (questionIndex === currentSection.questions.length - 1) {
                  if (sectionIndex === screener.content.sections.length - 1) {
                    navigate('/results');
                  } else {
                    setSectionIndex(sectionIndex + 1);
                    setQuestionIndex(0);
                  }
                  return;
                }
                setQuestionIndex((prevIndex) => prevIndex + 1);
              }}
            >
              {answer.title}
            </Button>
          ))}
      </Stack>
    </Stack>
  );
}
