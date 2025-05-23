import {
  Alert,
  Button,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { Answer, AnswerOption, Section, Screener } from '../models/screener';
import { fetchScreener } from '../utils/screener';
import { ResultsPage } from './ResultsPage';

export function Questions() {
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResultsPage, setShowResultsPage] = useState<boolean>(false);
  const [results, setResults] = useState<string[]>([]);
  const {
    data: screener,
    isLoading: isScreenerLoading,
    error: screenerError,
  } = useQuery({
    queryKey: ['screener'],
    queryFn: fetchScreener,
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
  const totalQuestionCount = screener.content.sections.reduce(
    (sum: number, section: Section) => sum + section.questions.length,
    0
  );

  async function selectAnswer(
    answer: AnswerOption,
    screener: Screener
  ): Promise<void> {
    setAnswers((prevAnswers: Answer[]) => [
      ...prevAnswers,
      {
        questionId: currentQuestion.questionId,
        value: answer.value,
      },
    ]);
    if (questionIndex === currentSection.questions.length - 1) {
      if (sectionIndex === screener.content.sections.length - 1) {
        const response = await fetch('/api/assessments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answers),
        });
        if (!response.ok) {
          const error = await response.json();
          <Alert severity="error">{`Failed to score assessment: ${JSON.stringify(error)}`}</Alert>;
          return;
        }
        const data = await response.json();
        setResults(data.results);
        setShowResultsPage(true);
      } else {
        setSectionIndex(sectionIndex + 1);
        setQuestionIndex(0);
      }
      return;
    }
    setQuestionIndex((prevIndex) => prevIndex + 1);
  }

  if (showResultsPage) {
    return <ResultsPage results={results} />;
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={4}
      sx={{
        marginTop: 10
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
      >
        Screener: {screener.content.displayName}
      </Typography>
      <Stack sx={{ width: '100%', maxWidth: 600, marginBottom: 5 }}>
        <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
          {`${answers.length} / ${totalQuestionCount}`} questions answered
        </Typography>
        <LinearProgress variant="determinate" value={(answers.length / totalQuestionCount) * 100}></LinearProgress>
      </Stack>
      {currentSection && (
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            maxWidth: 650,
          }}
        >
          {`Section ${sectionIndex + 1}: ${currentSection.title}`}
        </Typography>
      )}
      {currentQuestion && (
        <Typography variant="h6" fontWeight={600}>{`Question ${questionIndex + 1}: ${currentQuestion.title}`}</Typography>
      )}
      <Stack gap={2} flexDirection="column">
        {currentSection &&
          currentQuestion &&
          currentSection.answers.map((answer: AnswerOption) => (
            <Button
              key={answer.value}
              variant="contained"
              onClick={() => selectAnswer(answer, screener)}
            >
              {answer.title}
            </Button>
          ))}
      </Stack>
    </Stack>
  );
}
