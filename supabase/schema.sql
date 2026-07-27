-- ==============================================================================
-- 1. Create Enums
-- ==============================================================================
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR');
CREATE TYPE "PricingModel" AS ENUM ('FREE', 'FREEMIUM', 'PAID', 'ENTERPRISE');
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SCHEDULED');
CREATE TYPE "SubStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED');
CREATE TYPE "AffiliateStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- ==============================================================================
-- 2. Create Tables (Mirroring Prisma Schema)
-- ==============================================================================

CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT UNIQUE NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'EDITOR',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "profiles" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID UNIQUE NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "fullName" TEXT,
  "avatarUrl" TEXT,
  "bio" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "categories" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "description" TEXT,
  "icon" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tools" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "logoUrl" TEXT,
  "coverImageUrl" TEXT,
  "categoryId" UUID NOT NULL REFERENCES "categories"("id") ON DELETE RESTRICT,
  "shortDescription" TEXT NOT NULL,
  "fullReview" TEXT NOT NULL,
  "rating" DECIMAL(3,1) NOT NULL,
  "pricingModel" "PricingModel" NOT NULL,
  "isFree" BOOLEAN NOT NULL DEFAULT false,
  "officialWebsite" TEXT,
  "affiliateUrl" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "seoTitle" TEXT,
  "metaDescription" TEXT,
  "openGraphImage" TEXT,
  "tags" TEXT[],
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tool_features" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "toolId" UUID NOT NULL REFERENCES "tools"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tool_pros" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "toolId" UUID NOT NULL REFERENCES "tools"("id") ON DELETE CASCADE,
  "text" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tool_cons" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "toolId" UUID NOT NULL REFERENCES "tools"("id") ON DELETE CASCADE,
  "text" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tool_faqs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "toolId" UUID NOT NULL REFERENCES "tools"("id") ON DELETE CASCADE,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "comparisons" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" TEXT UNIQUE NOT NULL,
  "toolAId" UUID NOT NULL REFERENCES "tools"("id") ON DELETE RESTRICT,
  "toolBId" UUID NOT NULL REFERENCES "tools"("id") ON DELETE RESTRICT,
  "winnerId" UUID REFERENCES "tools"("id"),
  "summary" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "faqs" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "comparison_sections" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "comparisonId" UUID NOT NULL REFERENCES "comparisons"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "winnerId" UUID REFERENCES "tools"("id"),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "posts" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "excerpt" TEXT,
  "content" TEXT NOT NULL,
  "coverImage" TEXT,
  "authorId" UUID NOT NULL,
  "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
  "publishedAt" TIMESTAMP(3),
  "seoTitle" TEXT,
  "metaDescription" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tags" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "post_tags" (
  "postId" UUID NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "tagId" UUID NOT NULL REFERENCES "tags"("id") ON DELETE CASCADE,
  PRIMARY KEY ("postId", "tagId")
);

CREATE TABLE "newsletter_subscribers" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT UNIQUE NOT NULL,
  "status" "SubStatus" NOT NULL DEFAULT 'ACTIVE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "media_files" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "fileName" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "uploadedBy" UUID,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "affiliate_links" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "platform" TEXT NOT NULL,
  "toolName" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "affiliateUrl" TEXT NOT NULL,
  "fallbackUrl" TEXT,
  "status" "AffiliateStatus" NOT NULL DEFAULT 'ACTIVE',
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "seo_settings" (
  "id" TEXT PRIMARY KEY DEFAULT 'global',
  "title" TEXT,
  "description" TEXT,
  "canonical" TEXT,
  "openGraph" TEXT,
  "twitter" TEXT,
  "robots" TEXT,
  "sitemap" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "site_settings" (
  "id" TEXT PRIMARY KEY DEFAULT 'global',
  "siteName" TEXT,
  "logoUrl" TEXT,
  "faviconUrl" TEXT,
  "socialLinks" TEXT,
  "footerText" TEXT,
  "analyticsIds" TEXT,
  "affiliateDisclosure" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "activity_logs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entityId" TEXT,
  "details" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 3. Row Level Security (RLS)
-- ==============================================================================
-- For the public, all content can be read if published. For admins, everything can be read/written.
-- We'll enable RLS but create a simple policy allowing full access for now via Prisma service role,
-- while restricting client-side usage.

-- Default allow all for authenticated users (Admins via Prisma have bypassrls)
-- (In a true setup, we would restrict this heavily. We'll leave RLS off for Prisma, 
-- but add it if accessed directly via Supabase client).

-- ==============================================================================
-- 4. Auth Triggers
-- ==============================================================================
-- Automatically insert into public.users and public.profiles when a new auth.users is created.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (new.id, new.email, 'ADMIN'); -- Default to admin for this specific app

  INSERT INTO public.profiles (id, "userId", "fullName")
  VALUES (gen_random_uuid(), new.id, new.raw_user_meta_data->>'full_name');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- 5. Seed Data
-- ==============================================================================

-- Categories
INSERT INTO "categories" ("id", "name", "slug", "description", "icon") VALUES 
('c1000000-0000-0000-0000-000000000000', 'AI Chatbots', 'ai-chatbots', 'Conversational AI models and assistants.', 'MessageSquare'),
('c2000000-0000-0000-0000-000000000000', 'AI Code Editors', 'ai-code-editors', 'IDEs and editors with native AI capabilities.', 'Code'),
('c3000000-0000-0000-0000-000000000000', 'AI Automation', 'ai-automation', 'Workflow automation tools powered by AI.', 'Workflow');

-- Tools
INSERT INTO "tools" ("id", "name", "slug", "categoryId", "shortDescription", "fullReview", "rating", "pricingModel", "isFree", "published", "featured") VALUES 
('11111111-0000-0000-0000-000000000000', 'ChatGPT', 'chatgpt', 'c1000000-0000-0000-0000-000000000000', 'The industry standard conversational AI model by OpenAI.', 'Extensive review content here...', 4.9, 'FREEMIUM', false, true, true),
('22222222-0000-0000-0000-000000000000', 'Claude', 'claude', 'c1000000-0000-0000-0000-000000000000', 'Advanced reasoning and natural writing by Anthropic.', 'Extensive review content here...', 4.9, 'FREEMIUM', false, true, true),
('33333333-0000-0000-0000-000000000000', 'Cursor', 'cursor', 'c2000000-0000-0000-0000-000000000000', 'The AI-first code editor built to accelerate development.', 'Extensive review content here...', 4.9, 'FREEMIUM', false, true, true);

-- Default Settings
INSERT INTO "seo_settings" ("id", "title", "description") VALUES ('global', 'Quantas Admin', 'Admin Dashboard for Quantas AI Tools platform.');
INSERT INTO "site_settings" ("id", "siteName") VALUES ('global', 'Quantas');
