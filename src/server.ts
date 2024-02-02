import 'reflect-metadata'
import app from './app'
import { connectDB } from './typeorm';

const port = 4000;

app.listen(port, async () => {
  console.log('Server listening on port', port)
  await connectDB()
})