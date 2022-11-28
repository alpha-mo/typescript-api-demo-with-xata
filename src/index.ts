import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { getXataClient, Job } from './xata'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const xata = getXataClient()

type MyResponse<T> =
  | {
      error: string
    }
  | {
      data: T
    }

app.get('/api/jobs', async (req: Request, res: Response<MyResponse<Job[]>>) => {
  try {
    const jobs = await xata.db.job.getAll()
    return res.status(200).json({ data: jobs })
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' })
  }
})

app.post(
  '/api/jobs',
  async (req: Request<{}, {}, Job>, res: Response<MyResponse<Job>>) => {
    try {
      const job = req.body
      const createdJob = await xata.db.job.create(job)
      return res.status(201).json({ data: createdJob })
    } catch (error) {
      res.status(500).json({ error: 'Could not post new job' })
    }
  },
)

app.put(
  '/api/jobs/:id',
  async (
    req: Request<{ id: string }, {}, Job>,
    res: Response<MyResponse<Job>>,
  ) => {
    try {
      const id = req.params.id
      const job = req.body
      const updatedJob = await xata.db.job.update(id, job)
      if (!updatedJob) {
        return res.status(404).json({ error: 'Job not found' })
      }
      return res.status(200).json({ data: updatedJob })
    } catch (error) {
      res.status(500).json({ error: 'could not update job' })
    }
  },
)
app.delete(
  '/api/jobs/:id',
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<MyResponse<Job>>,
  ) => {
    try {
      const id = req.params.id
      const deletedJob = await xata.db.job.delete(id)
      if (!deletedJob) {
        return res.status(404).json({ error: 'Job not found' })
      }
      return res.status(200).json({ data: deletedJob })
    } catch (error) {
      res.status(500).json({ error: 'could not delete job' })
    }
  },
)

app.listen(PORT, () => {
  console.log('Listening on: ', `http://localhost:${PORT}`)
})
