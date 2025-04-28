import express from 'express';
import { Request, Response } from 'express';

import { knex } from '../db/knex.js';
import {
  Answer,
  DomainToLevel2Assessment,
  DomainToScoreThreshold,
  Domain,
  isDomain,
  type Question,
} from '../models/assessment.js';

export const router = express.Router();

const minAnswer = 0;
const maxAnswer = 4;

interface SuccessResponse {
  results: string[];
}

interface ErrorResponse {
  error: string;
}


router.post(
  '/',
  express.json(),
  async (
    req: Request<{}, {}, Answer[]>,
    res: Response<SuccessResponse | ErrorResponse>
  ) => {
    try {
      const answers = req.body;
      if (!answers || !Array.isArray(answers)) {
        res.status(400).json({ error: 'Answers must be provided as an array' });
        return;
      }

      const questions = await knex('questions').select('*');
      const questionIdToDomain = Object.fromEntries(questions.map((question: Question) => [question.questionId, question.domain]))
      const domainScores: Partial<Record<Domain, number>> = {};
      for (const answer of answers) {
        const domain = questionIdToDomain[answer.questionId];
        if (answer.value < minAnswer || answer.value > maxAnswer) {
          res.status(400).json({
            error: `Invalid answer value: ${answer.value} for question: ${answer.questionId}`,
          });
          return;
        }
        domainScores[domain] = (domainScores[domain] ?? 0) + answer.value;
      }
      const recommendedAssessments = Object.entries(domainScores)
        .filter((entry): entry is [Domain, number] => {
          const [domain, score] = entry;
          return (
            isDomain(domain) && 
            score !== undefined && 
            score >= DomainToScoreThreshold[domain]
          );
        })
        .map(([domain]) => DomainToLevel2Assessment[domain]);

      res.json({ results: [...new Set(recommendedAssessments)] });
    } catch (error) {
      console.error('Error scoring assessment:', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);
