import fs from "node:fs";
import path from "node:path";

export const AFFILIATE_SHEET_ID =
  process.env.GOOGLE_SHEETS_AFFILIATE_ID ?? "12OjCVYm9EO0C4SfQ_x9vkkxEoGGnt4GTGjFAIoMS2y0";

export const AFFILIATE_SHEET_TAB = process.env.GOOGLE_SHEETS_AFFILIATE_TAB ?? "Affiliate Tools";

export const AFFILIATE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${AFFILIATE_SHEET_ID}/edit`;

export const AFFILIATE_SHEET_HEADERS = [
  "Tool Name",
  "Official Website",
  "Category",
  "Free/Paid",
  "Starting Price",
  "Affiliate Program",
  "Affiliate URL",
  "Affiliate Network",
  "Commission",
  "Cookie Duration",
  "Minimum Payout",
  "Pros",
  "Cons",
  "Notes",
  "Keyword",
  "Search Volume",
  "Keyword Difficulty",
  "Review Status",
  "Comparison Status",
  "Best Tools Status",
  "Research Date",
  "Last Updated",
] as const;

export const AFFILIATE_SHEET_COLUMN_COUNT = AFFILIATE_SHEET_HEADERS.length;

function sheetRange(tab: string, cells: string) {
  return `'${tab.replace(/'/g, "''")}'!${cells}`;
}

export function affiliateSheetDataRange() {
  return sheetRange(AFFILIATE_SHEET_TAB, `A2:V`);
}

export function affiliateSheetRowRange(rowNumber: number) {
  return sheetRange(AFFILIATE_SHEET_TAB, `A${rowNumber}:V${rowNumber}`);
}

export function affiliateSheetAppendRange() {
  return sheetRange(AFFILIATE_SHEET_TAB, `A:V`);
}

export function isGoogleSheetsConfigured() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const filePath =
      process.env.GOOGLE_SERVICE_ACCOUNT_JSON_PATH ?? process.env.GOOGLE_APPLICATION_CREDENTIALS!;
    const resolved = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    return fs.existsSync(resolved);
  }
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return true;
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  );
}
