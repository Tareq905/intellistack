import {
  AFFILIATE_SHEET_COLUMN_COUNT,
  AFFILIATE_SHEET_ID,
  affiliateSheetAppendRange,
  affiliateSheetDataRange,
  affiliateSheetRowRange,
  isGoogleSheetsConfigured,
} from "./config";
import { getGoogleSheetsClient } from "./client";

export type AffiliateSheetEntry = {
  rowNumber: number;
  toolName: string;
  officialWebsite: string;
  category: string;
  freePaid: string;
  startingPrice: string;
  affiliateProgram: string;
  affiliateUrl: string;
  affiliateNetwork: string;
  commission: string;
  cookieDuration: string;
  minimumPayout: string;
  pros: string;
  cons: string;
  notes: string;
  keyword: string;
  searchVolume: string;
  keywordDifficulty: string;
  reviewStatus: string;
  comparisonStatus: string;
  bestToolsStatus: string;
  researchDate: string;
  lastUpdated: string;
};

export type AffiliateSheetInput = Omit<AffiliateSheetEntry, "rowNumber" | "lastUpdated"> & {
  lastUpdated?: string;
};

export function formatSheetDate(date = new Date()) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function rowValuesToEntry(row: string[], rowNumber: number): AffiliateSheetEntry | null {
  if (!row[0]?.trim()) return null;

  return {
    rowNumber,
    toolName: row[0] ?? "",
    officialWebsite: row[1] ?? "",
    category: row[2] ?? "",
    freePaid: row[3] ?? "",
    startingPrice: row[4] ?? "",
    affiliateProgram: row[5] ?? "",
    affiliateUrl: row[6] ?? "",
    affiliateNetwork: row[7] ?? "",
    commission: row[8] ?? "",
    cookieDuration: row[9] ?? "",
    minimumPayout: row[10] ?? "",
    pros: row[11] ?? "",
    cons: row[12] ?? "",
    notes: row[13] ?? "",
    keyword: row[14] ?? "",
    searchVolume: row[15] ?? "",
    keywordDifficulty: row[16] ?? "",
    reviewStatus: row[17] ?? "",
    comparisonStatus: row[18] ?? "",
    bestToolsStatus: row[19] ?? "",
    researchDate: row[20] ?? "",
    lastUpdated: row[21] ?? "",
  };
}

export function entryToRowValues(entry: AffiliateSheetInput): string[] {
  const today = formatSheetDate();
  return [
    entry.toolName,
    entry.officialWebsite,
    entry.category,
    entry.freePaid,
    entry.startingPrice,
    entry.affiliateProgram,
    entry.affiliateUrl,
    entry.affiliateNetwork,
    entry.commission,
    entry.cookieDuration,
    entry.minimumPayout,
    entry.pros,
    entry.cons,
    entry.notes,
    entry.keyword,
    entry.searchVolume,
    entry.keywordDifficulty,
    entry.reviewStatus,
    entry.comparisonStatus,
    entry.bestToolsStatus,
    entry.researchDate || today,
    entry.lastUpdated || today,
  ];
}

export async function listAffiliateSheetEntries(): Promise<AffiliateSheetEntry[]> {
  if (!isGoogleSheetsConfigured()) return [];

  const sheets = getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: AFFILIATE_SHEET_ID,
    range: affiliateSheetDataRange(),
  });

  const rows = response.data.values ?? [];
  return rows
    .map((row, index) => rowValuesToEntry(row, index + 2))
    .filter((entry): entry is AffiliateSheetEntry => Boolean(entry));
}

export async function getAffiliateSheetEntry(rowNumber: number): Promise<AffiliateSheetEntry | null> {
  if (!isGoogleSheetsConfigured() || rowNumber < 2) return null;

  const sheets = getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: AFFILIATE_SHEET_ID,
    range: affiliateSheetRowRange(rowNumber),
  });

  const row = response.data.values?.[0];
  if (!row) return null;
  return rowValuesToEntry(row, rowNumber);
}

export async function appendAffiliateSheetEntry(entry: AffiliateSheetInput) {
  const sheets = getGoogleSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: AFFILIATE_SHEET_ID,
    range: affiliateSheetAppendRange(),
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [entryToRowValues(entry)],
    },
  });
}

export async function updateAffiliateSheetEntry(rowNumber: number, entry: AffiliateSheetInput) {
  if (rowNumber < 2) throw new Error("Invalid sheet row");

  const sheets = getGoogleSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: AFFILIATE_SHEET_ID,
    range: affiliateSheetRowRange(rowNumber),
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [entryToRowValues({ ...entry, lastUpdated: formatSheetDate() })],
    },
  });
}

export async function deleteAffiliateSheetEntry(rowNumber: number) {
  if (rowNumber < 2) throw new Error("Invalid sheet row");

  const sheets = getGoogleSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: AFFILIATE_SHEET_ID,
    range: affiliateSheetRowRange(rowNumber),
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [Array(AFFILIATE_SHEET_COLUMN_COUNT).fill("")],
    },
  });
}
