import express from 'express'

const app = express();
const PORT = 5000

app.listen(PORT, () => {
  console.log(`Success! Server is running on port: ${PORT}`)
})

export default app
