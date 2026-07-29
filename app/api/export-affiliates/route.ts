import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const entries = await prisma.affiliateResearch.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Create CSV header
    const headers = [
      'Tool Name',
      'Official Website',
      'Category',
      'Free/Paid',
      'Starting Price',
      'Affiliate Program',
      'Affiliate URL',
      'Affiliate Network',
      'Commission',
      'Cookie Duration',
      'Minimum Payout',
      'Pros',
      'Cons',
      'Notes',
      'Keyword',
      'Search Volume',
      'Keyword Difficulty',
      'Review Status',
      'Comparison Status',
      'Best Tools Status',
      'Research Date',
      'Last Updated',
    ].join(',')

    // Create CSV rows
    const escapeCsv = (str: string | null) => {
      if (!str) return ''
      // Escape quotes and wrap in quotes if there are commas or newlines
      const escaped = str.replace(/"/g, '""')
      if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('\r')) {
        return `"${escaped}"`
      }
      return escaped
    }

    const rows = entries.map((entry) => [
      escapeCsv(entry.toolName),
      escapeCsv(entry.officialWebsite),
      escapeCsv(entry.category),
      escapeCsv(entry.freePaid),
      escapeCsv(entry.startingPrice),
      escapeCsv(entry.affiliateProgram),
      escapeCsv(entry.affiliateUrl),
      escapeCsv(entry.affiliateNetwork),
      escapeCsv(entry.commission),
      escapeCsv(entry.cookieDuration),
      escapeCsv(entry.minimumPayout),
      escapeCsv(entry.pros),
      escapeCsv(entry.cons),
      escapeCsv(entry.notes),
      escapeCsv(entry.keyword),
      escapeCsv(entry.searchVolume),
      escapeCsv(entry.keywordDifficulty),
      escapeCsv(entry.reviewStatus),
      escapeCsv(entry.comparisonStatus),
      escapeCsv(entry.bestToolsStatus),
      escapeCsv(entry.researchDate),
      escapeCsv(entry.lastUpdated),
    ].join(','))

    const csvContent = [headers, ...rows].join('\n')

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="affiliates.csv"',
      },
    })
  } catch (error) {
    console.error('Error exporting affiliates:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
