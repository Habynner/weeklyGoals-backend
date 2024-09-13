import { db } from '../db'
import { goals } from '../db/schema'
interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequecy: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequecy,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequecy,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
