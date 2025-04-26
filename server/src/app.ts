import express from 'express'
import cors from 'cors'

import { router as assessmentRouter } from './routes/assessment.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// ROUTES
app.use('/assessments', assessmentRouter)

app.listen(PORT, () => {
  console.log(`Success! Server is running on port: ${PORT}`)
})

export default app
