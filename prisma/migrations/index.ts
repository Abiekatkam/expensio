// This file was generated by prisma-field-encryption.

import type { PrismaClient } from '../C:\Users\ABHISHEK KATKAM\Desktop\Projects\SideProjects\expensio\node_modules\@prisma\client'
import { migrate as migratesubscriptions } from './subscriptions'
import { migrate as migrateexpenses } from './expenses'
import { migrate as migrateincome } from './income'
import { migrate as migrateinvestments } from './investments'

export interface ProgressReport {
  model: string
  processed: number
  totalCount: number
  performance: number
}

export type ProgressReportCallback = (
  progress: ProgressReport
) => void | Promise<void>

export const defaultProgressReport: ProgressReportCallback = ({
  model,
  totalCount,
  processed,
  performance
}) => {
  const length = totalCount.toString().length
  const pct = Math.round((100 * processed) / totalCount)
    .toString()
    .padStart(3)
  console.info(
    `${model.padEnd(13)} ${pct}% processed ${processed
      .toString()
      .padStart(length)} / ${totalCount} (took ${performance.toFixed(2)}ms)`
  )
}

// --

export type MigrationReport = {
  subscriptions: number,
  expenses: number,
  income: number,
  investments: number
}

/**
 * Migrate models sequentially.
 *
 * Processed models:
 * - subscriptions
 * - expenses
 * - income
 * - investments
 *
 * @returns a dictionary of the number of processed records per model.
 */
export async function migrate(
  client: PrismaClient,
  reportProgress: ProgressReportCallback = defaultProgressReport
): Promise<MigrationReport> {
  const processedsubscriptions = await migratesubscriptions(client, reportProgress)
  const processedexpenses = await migrateexpenses(client, reportProgress)
  const processedincome = await migrateincome(client, reportProgress)
  const processedinvestments = await migrateinvestments(client, reportProgress)
  return {
    subscriptions: processedsubscriptions,
    expenses: processedexpenses,
    income: processedincome,
    investments: processedinvestments
  }
}