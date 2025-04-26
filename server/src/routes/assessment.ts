import express from 'express'
import { Request, Response } from 'express'

import {
  Answer,
  DomainToLevel2Assessment,
  DomainToScoreThreshold,
  Domain,
} from '../models/assessment.js'

export const router = express.Router()

const minAnswer = 0
const maxAnswer = 4

interface AssessmentRequestBody {
  answers: Answer[]
}

interface SuccessResponse {
  results: string[]
}

interface ErrorResponse {
  error: string
}

// TODO: Move these into DB
const questionIdToDomain: Record<string, Domain> = {
  question_1: Domain.Depression,
  question_2: Domain.Mania,
  question_3: Domain.Anxiety,
  question_4: Domain.SubstanceUse,
}

router.post(
  '/',
  express.json(),
  (
    req: Request<{}, {}, AssessmentRequestBody>,
    res: Response<SuccessResponse | ErrorResponse>
  ) => {
    try {
      const { answers } = req.body
      if (!answers || !Array.isArray(answers)) {
        res.status(400).json({ error: 'Answers must be provided as an array' })
        return
      }

      const domainScores: Partial<Record<Domain, number>> = {}
      for (const answer of answers) {
        const domain = questionIdToDomain[answer.questionId]
        if (
          answer.value < minAnswer ||
          answer.value > maxAnswer
        ) {
          res
            .status(400)
            .json({ error: `Invalid answer value: ${answer.value} for question: ${answer.questionId}` })
          return
        }

        domainScores[domain] = (domainScores[domain] ?? 0) + answer.value
      }

      const recommendedAssessments = Object.entries(domainScores)
        .filter(([domain, score]) => {
          return score! >= DomainToScoreThreshold[domain as Domain]
        })
        .map(([domain]) => DomainToLevel2Assessment[domain as Domain])

      res.json({ results: [...new Set(recommendedAssessments)] })
    } catch (error) {
      console.error('Error scoring assessment:', error)
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
)
