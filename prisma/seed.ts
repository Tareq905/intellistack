import { PrismaClient, UserRole, PricingModel, PostStatus, SubStatus, AffiliateStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Users & Profiles (Assuming user is inserted manually or via Auth trigger)
  // We'll skip users for now since Supabase handles Auth users and triggers a profile creation.
  
  // 2. Categories
  console.log('Upserting Categories...');
  const catChatbots = await prisma.category.upsert({
    where: { slug: 'ai-chatbots' },
    update: {},
    create: { name: 'AI Chatbots', slug: 'ai-chatbots', description: 'Conversational AI models and assistants.', icon: 'MessageSquare' },
  });

  const catCodeEditors = await prisma.category.upsert({
    where: { slug: 'ai-code-editors' },
    update: {},
    create: { name: 'AI Code Editors', slug: 'ai-code-editors', description: 'IDEs and editors with native AI capabilities.', icon: 'Code' },
  });

  const catAutomation = await prisma.category.upsert({
    where: { slug: 'ai-automation' },
    update: {},
    create: { name: 'AI Automation', slug: 'ai-automation', description: 'Workflow automation tools powered by AI.', icon: 'Workflow' },
  });

  // 3. Tools
  console.log('Upserting Tools...');
  const toolChatgpt = await prisma.tool.upsert({
    where: { slug: 'chatgpt' },
    update: {},
    create: {
      name: 'ChatGPT',
      slug: 'chatgpt',
      categoryId: catChatbots.id,
      shortDescription: 'The industry standard conversational AI model by OpenAI.',
      fullReview: 'ChatGPT is a state-of-the-art conversational AI developed by OpenAI...',
      rating: 4.9,
      pricingModel: PricingModel.FREEMIUM,
      isFree: true,
      published: true,
      featured: true,
      tags: ['LLM', 'OpenAI', 'Chatbot'],
      features: {
        create: [
          { title: 'Advanced Reasoning', description: 'Can solve complex math and logic problems.' },
          { title: 'Vision', description: 'Can analyze and describe images.' }
        ]
      },
      pros: { create: [{ text: 'Highly versatile' }, { text: 'Huge plugin ecosystem' }] },
      cons: { create: [{ text: 'Knowledge cutoff limitations' }] },
      faqs: { create: [{ question: 'Is ChatGPT free?', answer: 'Yes, but a Plus version exists.' }] }
    },
  });

  const toolClaude = await prisma.tool.upsert({
    where: { slug: 'claude' },
    update: {},
    create: {
      name: 'Claude',
      slug: 'claude',
      categoryId: catChatbots.id,
      shortDescription: 'Advanced reasoning and natural writing by Anthropic.',
      fullReview: 'Claude is an AI assistant from Anthropic known for its long context window...',
      rating: 4.9,
      pricingModel: PricingModel.FREEMIUM,
      isFree: true,
      published: true,
      featured: true,
      tags: ['LLM', 'Anthropic', 'Writing'],
    },
  });

  const toolCursor = await prisma.tool.upsert({
    where: { slug: 'cursor' },
    update: {},
    create: {
      name: 'Cursor',
      slug: 'cursor',
      categoryId: catCodeEditors.id,
      shortDescription: 'The AI-first code editor built to accelerate development.',
      fullReview: 'Cursor is a fork of VS Code built specifically for AI-assisted coding...',
      rating: 4.9,
      pricingModel: PricingModel.FREEMIUM,
      isFree: true,
      published: true,
      featured: true,
      tags: ['Editor', 'Coding', 'Developer'],
    },
  });

  // 4. Comparisons
  console.log('Upserting Comparisons...');
  await prisma.comparison.upsert({
    where: { slug: 'chatgpt-vs-claude' },
    update: {},
    create: {
      slug: 'chatgpt-vs-claude',
      toolAId: toolChatgpt.id,
      toolBId: toolClaude.id,
      summary: 'While both are excellent, Claude excels at writing and ChatGPT wins in ecosystem.',
      content: 'A deep dive into the top two LLMs available today...',
      published: true,
      winnerId: toolClaude.id,
      sections: {
        create: [
          { title: 'Writing Capabilities', content: 'Claude feels more human-like.', winnerId: toolClaude.id },
          { title: 'Coding', content: 'ChatGPT with Code Interpreter is powerful.', winnerId: toolChatgpt.id }
        ]
      }
    },
  });

  // 5. Settings
  console.log('Upserting Settings...');
  await prisma.siteSetting.upsert({
    where: { id: 'global' },
    update: {},
    create: { id: 'global', siteName: 'Quantas Admin' },
  });

  await prisma.seoSetting.upsert({
    where: { id: 'global' },
    update: {},
    create: { id: 'global', title: 'Quantas', description: 'Quantas AI Tools Review Platform' },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
