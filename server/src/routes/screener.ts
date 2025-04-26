import express from 'express';
import { Request, Response } from 'express';

export const router = express.Router();

const screenerData = {
  "id": "abcd-123",
  "fullName": "Blueprint Diagnostic Screener",
  "name": "BPDS",
  "disorder": "Cross-Cutting",
  "content": {
    "displayName": "BDS",
    "sections": [
      {
        "type": "standard",
        "title": "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
        "questions": [
          {
            "questionId": "question_1",
            "title": "Little interest or pleasure in doing things?"
          },
          {
            "questionId": "question_2",
            "title": "Feeling down, depressed, or hopeless?"
          },
          {
            "questionId": "question_3",
            "title": "Sleeping less than usual, but still have a lot of energy?"
          },
          {
            "questionId": "question_4",
            "title": "Starting lots more projects than usual or doing more risky things than usual?"
          }
        ],
        "answers": [
          {
            "title": "Not at all",
            "value": 0
          },
          {
            "title": "Rare, less than a day or two",
            "value": 1
          },
          {
            "title": "Several days",
            "value": 2
          },
          {
            "title": "More than half the days",
            "value": 3
          },
          {
            "title": "Nearly every day",
            "value": 4
          }
        ],
      }
    ],
  },
};

router.get('/', (req: Request, res: Response) => {
  res.json(screenerData);
});
