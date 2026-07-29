import prisma from "./prisma";

export type AffiliateResearchEntry = {
  id: string;
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

export type AffiliateResearchInput = Omit<AffiliateResearchEntry, "id" | "lastUpdated"> & {
  lastUpdated?: string;
};

export function formatResearchDate(date = new Date()) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export async function listAffiliateResearchEntries(): Promise<AffiliateResearchEntry[]> {
  const entries = await prisma.affiliateResearch.findMany({
    orderBy: { createdAt: "desc" },
  });

  return entries.map((entry) => ({
    id: entry.id,
    toolName: entry.toolName ?? "",
    officialWebsite: entry.officialWebsite ?? "",
    category: entry.category ?? "",
    freePaid: entry.freePaid ?? "",
    startingPrice: entry.startingPrice ?? "",
    affiliateProgram: entry.affiliateProgram ?? "",
    affiliateUrl: entry.affiliateUrl ?? "",
    affiliateNetwork: entry.affiliateNetwork ?? "",
    commission: entry.commission ?? "",
    cookieDuration: entry.cookieDuration ?? "",
    minimumPayout: entry.minimumPayout ?? "",
    pros: entry.pros ?? "",
    cons: entry.cons ?? "",
    notes: entry.notes ?? "",
    keyword: entry.keyword ?? "",
    searchVolume: entry.searchVolume ?? "",
    keywordDifficulty: entry.keywordDifficulty ?? "",
    reviewStatus: entry.reviewStatus ?? "",
    comparisonStatus: entry.comparisonStatus ?? "",
    bestToolsStatus: entry.bestToolsStatus ?? "",
    researchDate: entry.researchDate ?? "",
    lastUpdated: entry.lastUpdated ?? "",
  }));
}

export async function getAffiliateResearchEntry(id: string): Promise<AffiliateResearchEntry | null> {
  const entry = await prisma.affiliateResearch.findUnique({
    where: { id },
  });

  if (!entry) return null;

  return {
    id: entry.id,
    toolName: entry.toolName ?? "",
    officialWebsite: entry.officialWebsite ?? "",
    category: entry.category ?? "",
    freePaid: entry.freePaid ?? "",
    startingPrice: entry.startingPrice ?? "",
    affiliateProgram: entry.affiliateProgram ?? "",
    affiliateUrl: entry.affiliateUrl ?? "",
    affiliateNetwork: entry.affiliateNetwork ?? "",
    commission: entry.commission ?? "",
    cookieDuration: entry.cookieDuration ?? "",
    minimumPayout: entry.minimumPayout ?? "",
    pros: entry.pros ?? "",
    cons: entry.cons ?? "",
    notes: entry.notes ?? "",
    keyword: entry.keyword ?? "",
    searchVolume: entry.searchVolume ?? "",
    keywordDifficulty: entry.keywordDifficulty ?? "",
    reviewStatus: entry.reviewStatus ?? "",
    comparisonStatus: entry.comparisonStatus ?? "",
    bestToolsStatus: entry.bestToolsStatus ?? "",
    researchDate: entry.researchDate ?? "",
    lastUpdated: entry.lastUpdated ?? "",
  };
}

export async function appendAffiliateResearchEntry(entry: AffiliateResearchInput) {
  const today = formatResearchDate();
  await prisma.affiliateResearch.create({
    data: {
      ...entry,
      researchDate: entry.researchDate || today,
      lastUpdated: today,
    },
  });
}

export async function updateAffiliateResearchEntry(id: string, entry: AffiliateResearchInput) {
  await prisma.affiliateResearch.update({
    where: { id },
    data: {
      ...entry,
      lastUpdated: formatResearchDate(),
    },
  });
}

export async function deleteAffiliateResearchEntry(id: string) {
  await prisma.affiliateResearch.delete({
    where: { id },
  });
}
