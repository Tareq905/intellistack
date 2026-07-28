import fs from "node:fs";
import path from "node:path";
import { google } from "googleapis";

function loadCredentialsFromJsonFile(filePath: string) {
  const resolved = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Google service account file not found: ${resolved}`);
  }
  const parsed = JSON.parse(fs.readFileSync(resolved, "utf-8")) as {
    client_email: string;
    private_key: string;
  };
  return {
    email: parsed.client_email,
    key: parsed.private_key,
  };
}

function getServiceAccountCredentials() {
  const jsonPath =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON_PATH ??
    process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (jsonPath) {
    return loadCredentialsFromJsonFile(jsonPath);
  }

  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    const parsed = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) as {
      client_email: string;
      private_key: string;
    };
    return {
      email: parsed.client_email,
      key: parsed.private_key,
    };
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error(
      "Google Sheets credentials missing. Set GOOGLE_SERVICE_ACCOUNT_JSON_PATH (recommended), GOOGLE_SERVICE_ACCOUNT_JSON, or GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.",
    );
  }

  return { email, key };
}

export function getGoogleSheetsClient() {
  const { email, key } = getServiceAccountCredentials();

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}
