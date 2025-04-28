import cors from 'cors';
import express from 'express';

import { router as assessmentRouter } from './routes/assessment.js';
import { router as screenerRouter } from './routes/screener.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/assessments', assessmentRouter);
app.use('/screener', screenerRouter);

app.listen(PORT, () => {
  console.log(`Success! Server is running on port: ${PORT}`);
});

export default app;
