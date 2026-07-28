'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import {
  appendAffiliateSheetEntry,
  deleteAffiliateSheetEntry,
  updateAffiliateSheetEntry,
  formatSheetDate,
} from '@/lib/google-sheets/affiliate-database'

const entrySchema = z.object({
  toolName: z.string().min(1, 'Tool name is required'),
  officialWebsite: z.string().optional(),
  category: z.string().optional(),
  freePaid: z.string().optional(),
  startingPrice: z.string().optional(),
  affiliateProgram: z.string().optional(),
  affiliateUrl: z.string().optional(),
  affiliateNetwork: z.string().optional(),
  commission: z.string().optional(),
  cookieDuration: z.string().optional(),
  minimumPayout: z.string().optional(),
  pros: z.string().optional(),
  cons: z.string().optional(),
  notes: z.string().optional(),
  keyword: z.string().optional(),
  searchVolume: z.string().optional(),
  keywordDifficulty: z.string().optional(),
  reviewStatus: z.string().optional(),
  comparisonStatus: z.string().optional(),
  bestToolsStatus: z.string().optional(),
  researchDate: z.string().optional(),
})

function parseEntry(formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  return entrySchema.safeParse(raw)
}

function toEntry(data: z.infer<typeof entrySchema>) {
  return {
    toolName: data.toolName,
    officialWebsite: data.officialWebsite ?? '',
    category: data.category ?? '',
    freePaid: data.freePaid ?? '',
    startingPrice: data.startingPrice ?? '',
    affiliateProgram: data.affiliateProgram ?? '',
    affiliateUrl: data.affiliateUrl ?? '',
    affiliateNetwork: data.affiliateNetwork ?? '',
    commission: data.commission ?? '',
    cookieDuration: data.cookieDuration ?? '',
    minimumPayout: data.minimumPayout ?? '',
    pros: data.pros ?? '',
    cons: data.cons ?? '',
    notes: data.notes ?? '',
    keyword: data.keyword ?? '',
    searchVolume: data.searchVolume ?? '',
    keywordDifficulty: data.keywordDifficulty ?? '',
    reviewStatus: data.reviewStatus ?? '',
    comparisonStatus: data.comparisonStatus ?? '',
    bestToolsStatus: data.bestToolsStatus ?? '',
    researchDate: data.researchDate ?? formatSheetDate(),
  }
}

export async function createAffiliateSheetEntry(formData: FormData) {
  const parsed = parseEntry(formData)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  try {
    await appendAffiliateSheetEntry(toEntry(parsed.data))
  } catch (error) {
    return { error: { _form: [(error as Error).message] } }
  }

  revalidatePath('/admin/affiliate-sheet')
  redirect('/admin/affiliate-sheet')
}

export async function updateAffiliateSheetEntryAction(rowNumber: number, formData: FormData) {
  const parsed = parseEntry(formData)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  try {
    await updateAffiliateSheetEntry(rowNumber, toEntry(parsed.data))
  } catch (error) {
    return { error: { _form: [(error as Error).message] } }
  }

  revalidatePath('/admin/affiliate-sheet')
  redirect('/admin/affiliate-sheet')
}

export async function deleteAffiliateSheetEntryAction(rowNumber: number) {
  await deleteAffiliateSheetEntry(rowNumber)
  revalidatePath('/admin/affiliate-sheet')
  redirect('/admin/affiliate-sheet')
}
