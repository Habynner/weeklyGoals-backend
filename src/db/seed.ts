import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequecy: 5 },
      { title: 'Atividade fisica', desiredWeeklyFrequecy: 3 },
      { title: 'Estudar', desiredWeeklyFrequecy: 3 },
    ])
    .returning()

  const startWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startWeek.toDate() },
    { goalId: result[1].id, createdAt: startWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
