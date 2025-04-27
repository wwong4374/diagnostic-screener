import { Alert, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export function Questions() {
  const navigate = useNavigate()
  const [sectionTitle, setSectionTitle] = useState<string | null>(null);
  const [questionId, setQuestionId] = useState<string | null>(null);
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
    return <CircularProgress></CircularProgress>;
  }
  if (screenerError) {
    return <Alert>{`Error loading screener: ${screenerError}`}</Alert>;
  }
  if (!screener?.content?.sections?.length) {
    return <Alert severity="error">{`Received empty screener!`}</Alert>;
  }
  if (sectionTitle === null) {
    setSectionTitle(screener.content.sections[0].title)
  }
  const currentSection = screener.content.sections.find((section: Record<string, any>) => section.title === sectionTitle)
  const currentQuestion = currentSection?.questions[questionIndex]
  if (questionId === null && currentQuestion) {
    setQuestionId(currentQuestion.questionId);
  }

  return (
    <Stack alignItems="center" gap={4} sx={{ marginTop: 5 }}>
      <Typography variant="h5">{screener.fullName}</Typography>
      {currentSection && <Typography variant="h6">{currentSection.title}</Typography>}
      {currentQuestion && <Typography>{currentQuestion.title}</Typography>}
      <Stack gap={2} flexWrap="wrap">
        {currentSection && currentSection.answers.map((answer: Record<string, any>) => (
          <Button
            key={answer.value}
            variant="contained"
            onClick={() => {
              if (questionIndex === currentSection.questions.length - 1) {
                navigate('/results')
              }
              setQuestionIndex(questionIndex + 1)
              setQuestionId(currentSection.questions[questionIndex + 1])
            }}
          >
            {answer.title}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
