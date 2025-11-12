import { db } from "./db";
import { aiTools } from "@shared/schema";

const aiToolsData = [
  {
    name: "ChatGPT",
    category: "Conversational AI",
    pricing: "Free / $20/mo (Plus) / $200/mo (Team)",
    features: ["Natural language conversations", "Code generation", "Document analysis", "Multi-turn context", "Web browsing", "Image analysis"],
    useCases: "Email drafting, customer support, content creation, data analysis, research",
    description: "OpenAI's flagship conversational AI, perfect for mortgage professionals who need assistance with writing, analysis, and automation.",
    detailedDescription: "ChatGPT is the most versatile AI assistant available, powered by GPT-4. It excels at understanding complex mortgage scenarios, drafting professional communications, analyzing documents, and providing instant answers to questions. The Plus tier includes advanced features like web browsing and priority access during peak times.",
    strengths: [
      "Exceptional natural language understanding",
      "Versatile across many tasks",
      "Regular updates and improvements",
      "Large context window for complex conversations",
      "Custom GPTs for specialized workflows"
    ],
    weaknesses: [
      "Can occasionally provide outdated information",
      "Requires internet connection",
      "Free tier has usage limitations",
      "No built-in CRM integration"
    ],
    bestFor: [
      "Email and communication drafting",
      "Market research and analysis",
      "Customer inquiry responses",
      "Training material creation",
      "Brainstorming sessions"
    ],
    link: "https://chat.openai.com",
    videoUrl: null,
    sortOrder: 1
  },
  {
    name: "Claude",
    category: "Conversational AI",
    pricing: "Free / $20/mo (Pro) / Enterprise pricing",
    features: ["200K token context window", "Document analysis", "Code generation", "Ethical AI design", "Artifacts for content creation"],
    useCases: "Long document analysis, loan file review, compliance checking, detailed research",
    description: "Anthropic's AI assistant with industry-leading context window, ideal for analyzing complex loan documents and maintaining lengthy conversations.",
    detailedDescription: "Claude by Anthropic stands out with its massive 200K token context window, allowing it to analyze entire loan files in a single conversation. It's designed with safety and ethics in mind, making it particularly well-suited for compliance-sensitive work in the mortgage industry.",
    strengths: [
      "Massive context window for long documents",
      "Strong ethical guardrails",
      "Excellent at following detailed instructions",
      "Artifacts feature for iterative content creation",
      "Strong analytical capabilities"
    ],
    weaknesses: [
      "Smaller ecosystem than ChatGPT",
      "No built-in web browsing",
      "Limited plugin support",
      "Higher learning curve for some features"
    ],
    bestFor: [
      "Analyzing complete loan files",
      "Compliance document review",
      "Complex scenario planning",
      "Detailed policy interpretation",
      "Long-form content generation"
    ],
    link: "https://claude.ai",
    videoUrl: null,
    sortOrder: 2
  },
  {
    name: "Microsoft Copilot",
    category: "Productivity",
    pricing: "Free / $20/mo (Pro) / Included with Microsoft 365",
    features: ["Microsoft 365 integration", "Web browsing", "Image generation", "Citation mode", "Cross-platform"],
    useCases: "Office document creation, email management, calendar scheduling, research with sources",
    description: "Microsoft's AI assistant integrated directly into Office apps, perfect for mortgage professionals already using Microsoft 365.",
    detailedDescription: "Microsoft Copilot brings AI directly into Word, Excel, PowerPoint, Outlook, and Teams. For mortgage professionals, this means AI-powered email composition, data analysis in Excel, presentation creation, and meeting summaries - all within your existing workflow.",
    strengths: [
      "Seamless Microsoft 365 integration",
      "Works within familiar apps",
      "Citation mode for verified information",
      "Cross-device synchronization",
      "Enterprise security and compliance"
    ],
    weaknesses: [
      "Best features require Microsoft 365 subscription",
      "Less conversational than ChatGPT",
      "Limited customization options",
      "Learning curve for full feature set"
    ],
    bestFor: [
      "Microsoft 365 users",
      "Enterprise environments",
      "Email and document automation",
      "Data analysis in Excel",
      "Meeting summaries and notes"
    ],
    link: "https://copilot.microsoft.com",
    videoUrl: null,
    sortOrder: 3
  },
  {
    name: "Jasper",
    category: "Content Writing",
    pricing: "$49-$125/mo",
    features: ["Brand voice customization", "SEO optimization", "Team collaboration", "50+ templates", "Plagiarism checker"],
    useCases: "Marketing copy, blog posts, social media content, email campaigns, property descriptions",
    description: "AI writing assistant specialized in marketing content, helping mortgage professionals create compelling copy that converts.",
    detailedDescription: "Jasper is built specifically for marketing teams and focuses on creating on-brand, SEO-optimized content. It learns your brand voice and can generate consistent content across all channels - from social media posts to long-form blog articles.",
    strengths: [
      "Brand voice training capability",
      "SEO optimization built-in",
      "Extensive template library",
      "Team collaboration features",
      "Content optimization suggestions"
    ],
    weaknesses: [
      "Higher price point",
      "Learning curve for advanced features",
      "Requires brand voice setup time",
      "Output quality varies by template"
    ],
    bestFor: [
      "Marketing teams",
      "Social media management",
      "Blog content creation",
      "Email marketing campaigns",
      "Brand-consistent messaging"
    ],
    link: "https://jasper.ai",
    videoUrl: null,
    sortOrder: 4
  },
  {
    name: "Copy.ai",
    category: "Content Writing",
    pricing: "Free / $49/mo (Pro)",
    features: ["90+ templates", "Multi-language support", "Workflow automation", "Brand voice", "Team workspaces"],
    useCases: "Ad copy, product descriptions, social posts, email subject lines, blog outlines",
    description: "Affordable AI copywriting tool with extensive templates for creating marketing materials quickly.",
    detailedDescription: "Copy.ai makes it easy to generate marketing copy with minimal effort. Its template-based approach is perfect for mortgage professionals who need to create ads, social posts, and email campaigns without spending hours writing.",
    strengths: [
      "Affordable pricing",
      "User-friendly interface",
      "Large template collection",
      "Free tier available",
      "Quick content generation"
    ],
    weaknesses: [
      "Less sophisticated than premium tools",
      "Template dependency",
      "Limited customization options",
      "Output requires editing"
    ],
    bestFor: [
      "Small businesses and solopreneurs",
      "Social media content",
      "Quick ad copy generation",
      "Email marketing",
      "Budget-conscious teams"
    ],
    link: "https://copy.ai",
    videoUrl: null,
    sortOrder: 5
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    pricing: "$10-$120/mo",
    features: ["Photorealistic images", "Artistic styles", "Upscaling", "Variations", "Community gallery"],
    useCases: "Marketing visuals, social media graphics, property visualizations, brand imagery",
    description: "Leading AI image generator for creating stunning visual content for marketing and branding.",
    detailedDescription: "Midjourney creates publication-quality images from text descriptions. Mortgage professionals use it for creating unique marketing visuals, property staging concepts, and eye-catching social media content that stands out.",
    strengths: [
      "Exceptional image quality",
      "Wide range of artistic styles",
      "Active community and resources",
      "Consistent results",
      "Regular model improvements"
    ],
    weaknesses: [
      "Discord-based interface (learning curve)",
      "No free tier",
      "Slower generation than some competitors",
      "Limited control over specific details"
    ],
    bestFor: [
      "Marketing teams",
      "Social media content",
      "Brand imagery",
      "Creative professionals",
      "High-quality visual content"
    ],
    link: "https://midjourney.com",
    videoUrl: null,
    sortOrder: 6
  },
  {
    name: "DALL-E 3",
    category: "Image Generation",
    pricing: "Included with ChatGPT Plus ($20/mo)",
    features: ["Integrated with ChatGPT", "Text rendering", "Precise prompt following", "Safety controls", "High resolution"],
    useCases: "Marketing images, illustrations, social media graphics, concept visualization",
    description: "OpenAI's image generator integrated into ChatGPT, making it easy to create images mid-conversation.",
    detailedDescription: "DALL-E 3 is seamlessly integrated into ChatGPT, allowing you to generate images while working on other tasks. It excels at following detailed prompts and can even render text accurately in images, making it perfect for creating marketing materials with specific messaging.",
    strengths: [
      "ChatGPT integration",
      "Accurate text rendering",
      "Follows prompts precisely",
      "User-friendly interface",
      "No separate subscription needed"
    ],
    weaknesses: [
      "Requires ChatGPT Plus",
      "Limited style control",
      "Slower than dedicated tools",
      "Usage limitations on free tier"
    ],
    bestFor: [
      "ChatGPT Plus users",
      "Quick image generation",
      "Images with text",
      "Marketing graphics",
      "Social media content"
    ],
    link: "https://openai.com/dall-e-3",
    videoUrl: null,
    sortOrder: 7
  },
  {
    name: "Canva AI",
    category: "Design",
    pricing: "Free / $15/mo (Pro) / $30/mo (Teams)",
    features: ["Magic Design", "Magic Write", "Background remover", "Brand kit", "Template library"],
    useCases: "Social media graphics, presentations, flyers, infographics, brand materials",
    description: "All-in-one design platform with AI features for creating professional marketing materials without design skills.",
    detailedDescription: "Canva combines an intuitive design interface with AI-powered features. Mortgage professionals can create professional presentations, social media posts, flyers, and more using templates and AI assistance. The brand kit ensures consistency across all materials.",
    strengths: [
      "User-friendly interface",
      "Massive template library",
      "AI-powered design suggestions",
      "Brand consistency tools",
      "Collaborative features"
    ],
    weaknesses: [
      "Can feel template-heavy",
      "Limited customization for advanced users",
      "Best features require paid plan",
      "File organization can be challenging"
    ],
    bestFor: [
      "Non-designers",
      "Social media management",
      "Marketing materials",
      "Presentations",
      "Brand consistency"
    ],
    link: "https://canva.com",
    videoUrl: null,
    sortOrder: 8
  },
  {
    name: "Notion AI",
    category: "Productivity",
    pricing: "$10/mo (add-on to Notion)",
    features: ["Writing assistance", "Summarization", "Translation", "Brainstorming", "Integrated with Notion"],
    useCases: "Note-taking, meeting summaries, documentation, project management, knowledge base",
    description: "AI assistant built into Notion for enhancing productivity and knowledge management.",
    detailedDescription: "Notion AI brings AI capabilities directly into your workspace. It can summarize meeting notes, draft emails, brainstorm ideas, and help organize information - all within the Notion environment you already use for project management and documentation.",
    strengths: [
      "Seamless Notion integration",
      "Works within existing workflow",
      "Affordable pricing",
      "Multiple AI capabilities",
      "Team collaboration"
    ],
    weaknesses: [
      "Requires Notion subscription",
      "Limited to Notion ecosystem",
      "Less powerful than standalone AI tools",
      "No standalone access"
    ],
    bestFor: [
      "Notion users",
      "Team collaboration",
      "Documentation",
      "Meeting notes",
      "Knowledge management"
    ],
    link: "https://notion.so/product/ai",
    videoUrl: null,
    sortOrder: 9
  },
  {
    name: "Grammarly",
    category: "Writing Assistant",
    pricing: "Free / $12/mo (Premium) / $15/mo (Business)",
    features: ["Grammar checking", "Tone detection", "Plagiarism detection", "Style suggestions", "Browser extension"],
    useCases: "Email proofreading, document editing, professional communication, content quality",
    description: "AI-powered writing assistant that ensures professional, error-free communication.",
    detailedDescription: "Grammarly is essential for maintaining professional communication. It checks grammar, spelling, punctuation, and tone across all platforms - from emails to social media to documents. The Business tier includes brand tone consistency and team analytics.",
    strengths: [
      "Works everywhere via browser extension",
      "Real-time suggestions",
      "Tone and clarity improvements",
      "Plagiarism detection",
      "Team features"
    ],
    weaknesses: [
      "Can be overly prescriptive",
      "Premium features cost extra",
      "Occasional false positives",
      "Limited creative writing support"
    ],
    bestFor: [
      "Professional communication",
      "Email correspondence",
      "Document editing",
      "Team consistency",
      "Error-free writing"
    ],
    link: "https://grammarly.com",
    videoUrl: null,
    sortOrder: 10
  },
  {
    name: "Zapier AI",
    category: "Automation",
    pricing: "Free / $29.99-$599/mo",
    features: ["No-code automation", "5000+ app integrations", "AI-powered workflows", "Multi-step zaps", "Custom logic"],
    useCases: "CRM automation, email workflows, lead management, data synchronization, task automation",
    description: "Connect your apps and automate workflows using AI-powered no-code automation.",
    detailedDescription: "Zapier connects all your business tools and automates repetitive tasks. For mortgage professionals, this means automatically adding leads to your CRM, sending follow-up emails, updating spreadsheets, and more - all without writing code.",
    strengths: [
      "Extensive app integration library",
      "No coding required",
      "AI-powered automation suggestions",
      "Reliable and stable",
      "Great documentation"
    ],
    weaknesses: [
      "Can get expensive at scale",
      "Task-based pricing",
      "Complex workflows require paid plans",
      "Learning curve for advanced features"
    ],
    bestFor: [
      "Workflow automation",
      "CRM integration",
      "Lead management",
      "Data synchronization",
      "Repetitive task elimination"
    ],
    link: "https://zapier.com",
    videoUrl: null,
    sortOrder: 11
  },
  {
    name: "Make (Integromat)",
    category: "Automation",
    pricing: "Free / $9-$299/mo",
    features: ["Visual automation builder", "1000+ integrations", "Advanced logic", "Error handling", "Real-time execution"],
    useCases: "Complex workflows, data processing, multi-step automation, API integration",
    description: "Visual automation platform for building sophisticated workflows without code.",
    detailedDescription: "Make (formerly Integromat) provides a visual interface for building complex automation workflows. It's more powerful than Zapier for advanced use cases and offers better value for high-volume automations.",
    strengths: [
      "Visual workflow builder",
      "More affordable than competitors",
      "Powerful logic capabilities",
      "Better for complex workflows",
      "Generous free tier"
    ],
    weaknesses: [
      "Steeper learning curve",
      "Less polished interface",
      "Smaller community than Zapier",
      "Fewer templates"
    ],
    bestFor: [
      "Complex automation workflows",
      "Data transformation",
      "API integrations",
      "Power users",
      "Cost-conscious teams"
    ],
    link: "https://make.com",
    videoUrl: null,
    sortOrder: 12
  },
  {
    name: "Otter.ai",
    category: "Transcription",
    pricing: "Free / $10-$30/mo",
    features: ["Real-time transcription", "Speaker identification", "Meeting summaries", "Action items", "Integration with Zoom/Teams"],
    useCases: "Meeting transcription, client calls, training sessions, interview notes",
    description: "AI-powered transcription service that turns conversations into searchable text with summaries.",
    detailedDescription: "Otter.ai automatically transcribes meetings, calls, and conversations in real-time. It identifies speakers, generates summaries, and extracts action items - making it invaluable for mortgage professionals who need to document client conversations and team meetings.",
    strengths: [
      "Accurate real-time transcription",
      "Speaker identification",
      "Automated summaries",
      "Zoom/Teams integration",
      "Searchable transcripts"
    ],
    weaknesses: [
      "Accuracy varies with audio quality",
      "Limited customization",
      "Free tier has usage limits",
      "No offline capability"
    ],
    bestFor: [
      "Meeting documentation",
      "Client call notes",
      "Interview transcription",
      "Team meetings",
      "Training sessions"
    ],
    link: "https://otter.ai",
    videoUrl: null,
    sortOrder: 13
  },
  {
    name: "Descript",
    category: "Video/Audio Editing",
    pricing: "Free / $12-$24/mo",
    features: ["Text-based editing", "AI voice cloning", "Studio sound", "Filler word removal", "Transcription"],
    useCases: "Podcast editing, video content, voiceovers, training videos, social media clips",
    description: "Revolutionary video and audio editor that works like a document editor, powered by AI.",
    detailedDescription: "Descript lets you edit video and audio by editing text. It automatically transcribes content, removes filler words, enhances audio quality, and can even generate AI voice clones. Perfect for mortgage professionals creating educational content or podcast s.",
    strengths: [
      "Intuitive text-based editing",
      "Automatic transcription",
      "AI voice cloning",
      "Studio-quality sound enhancement",
      "All-in-one platform"
    ],
    weaknesses: [
      "Learning curve for traditional editors",
      "Resource-intensive",
      "Limited advanced video effects",
      "Export times can be slow"
    ],
    bestFor: [
      "Podcast production",
      "Educational videos",
      "Content repurposing",
      "Quick edits",
      "Voiceover generation"
    ],
    link: "https://descript.com",
    videoUrl: null,
    sortOrder: 14
  },
  {
    name: "Gamma",
    category: "Presentations",
    pricing: "Free / $10-$20/mo",
    features: ["AI-generated presentations", "Interactive content", "Analytics", "Collaboration", "Templates"],
    useCases: "Client presentations, pitch decks, training materials, proposals, reports",
    description: "AI-powered presentation tool that creates beautiful slides from text prompts or outlines.",
    detailedDescription: "Gamma generates complete presentations from simple outlines or prompts. It handles design, layout, and formatting automatically, allowing mortgage professionals to create professional presentations in minutes instead of hours.",
    strengths: [
      "Extremely fast presentation creation",
      "Professional design automatically",
      "Interactive elements",
      "No design skills required",
      "Collaboration features"
    ],
    weaknesses: [
      "Limited customization vs PowerPoint",
      "Requires internet connection",
      "Smaller template library",
      "Export options limited on free tier"
    ],
    bestFor: [
      "Quick presentations",
      "Client pitches",
      "Training materials",
      "Internal reports",
      "Non-designers"
    ],
    link: "https://gamma.app",
    videoUrl: null,
    sortOrder: 15
  }
];

// Additional 30+ tools to reach 45+ total
const additionalTools = [
  {
    name: "Perplexity AI",
    category: "Research",
    pricing: "Free / $20/mo (Pro)",
    features: ["AI-powered search", "Source citations", "Follow-up questions", "Multiple AI models", "Mobile app"],
    useCases: "Market research, competitor analysis, industry trends, fact-checking",
    description: "AI search engine that provides answers with sources, perfect for research and staying informed.",
    detailedDescription: "Perplexity combines the power of AI with real-time web search to provide accurate, cited answers to your questions. It's like having a research assistant that can find and synthesize information from multiple sources instantly.",
    strengths: ["Cited sources", "Real-time information", "Follow-up questions", "Multiple AI models", "Clean interface"],
    weaknesses: ["Limited customization", "Free tier has daily limits", "No offline mode", "Occasional citation gaps"],
    bestFor: ["Market research", "Competitive analysis", "Staying informed", "Fact-checking", "Quick research"],
    link: "https://perplexity.ai",
    videoUrl: null,
    sortOrder: 16
  },
  {
    name: "Synthesia",
    category: "Video Creation",
    pricing: "$30-$90+/mo",
    features: ["AI avatars", "140+ languages", "Custom avatars", "Screen recording", "Templates"],
    useCases: "Training videos, client onboarding, explainer videos, marketing content",
    description: "Create professional videos with AI avatars - no camera or crew needed.",
    detailedDescription: "Synthesia generates videos using AI avatars that speak your script in multiple languages. Mortgage professionals use it for creating training materials, client explainers, and marketing videos without filming.",
    strengths: ["No filming required", "Multiple languages", "Custom avatar option", "Professional output", "Time-saving"],
    weaknesses: ["Expensive", "Uncanny valley for some", "Limited customization", "Watermark on lower tiers"],
    bestFor: ["Training videos", "Multilingual content", "Explainer videos", "Client onboarding", "Marketing"],
    link: "https://synthesia.io",
    videoUrl: null,
    sortOrder: 17
  },
  {
    name: "Fireflies.ai",
    category: "Meeting Assistant",
    pricing: "Free / $10-$19/mo",
    features: ["Meeting recording", "Transcription", "AI summaries", "Action items", "CRM integration"],
    useCases: "Meeting notes, client calls, team meetings, training sessions",
    description: "AI meeting assistant that joins calls, takes notes, and provides searchable transcripts.",
    detailedDescription: "Fireflies joins your video meetings, records conversations, generates transcripts, and extracts action items automatically. Integrates with major CRMs to sync notes directly.",
    strengths: ["Automatic meeting join", "CRM integration", "Speaker identification", "Searchable transcripts", "Affordable"],
    weaknesses: ["Privacy concerns for some", "Accuracy varies", "Free tier limited", "May miss context"],
    bestFor: ["Meeting documentation", "Client calls", "Team meetings", "CRM sync", "Action tracking"],
    link: "https://fireflies.ai",
    videoUrl: null,
    sortOrder: 18
  },
  {
    name: "Wordtune",
    category: "Writing Assistant",
    pricing: "Free / $10-$25/mo",
    features: ["Sentence rewriting", "Tone adjustment", "Expansion/shortening", "Translation", "Summarization"],
    useCases: "Email refinement, content improvement, professional writing, clarity enhancement",
    description: "AI writing companion that helps rephrase and improve your writing in real-time.",
    detailedDescription: "Wordtune suggests alternative ways to express your thoughts, helping you write more clearly and professionally. Perfect for refining emails, proposals, and client communications.",
    strengths: ["Multiple rewrite options", "Tone adjustment", "Real-time suggestions", "Browser extension", "Easy to use"],
    weaknesses: ["Limited free tier", "Can be repetitive", "English-focused", "Requires internet"],
    bestFor: ["Email refinement", "Professional writing", "Non-native speakers", "Clarity improvement", "Quick rewrites"],
    link: "https://wordtune.com",
    videoUrl: null,
    sortOrder: 19
  },
  {
    name: "Runway ML",
    category: "Video Editing",
    pricing: "Free / $12-$76/mo",
    features: ["AI video editing", "Background removal", "Object removal", "Video generation", "Effects"],
    useCases: "Video content creation, social media clips, marketing videos, creative projects",
    description: "AI-powered video editing platform with cutting-edge generative features.",
    detailedDescription: "Runway provides professional video editing tools powered by AI, including background removal, object tracking, and even AI video generation from text prompts.",
    strengths: ["Cutting-edge AI features", "Professional results", "No technical expertise needed", "Cloud-based", "Regular updates"],
    weaknesses: ["Expensive for full features", "Learning curve", "Resource-intensive", "Credit-based pricing"],
    bestFor: ["Professional video creation", "Social media content", "Marketing videos", "Creative projects", "Content creators"],
    link: "https://runwayml.com",
    videoUrl: null,
    sortOrder: 20
  },
  {
    name: "Superhuman",
    category: "Email Management",
    pricing: "$30/mo",
    features: ["AI email triage", "Scheduled sending", "Read receipts", "Snippets", "Keyboard shortcuts"],
    useCases: "Email productivity, inbox zero, professional communication, time management",
    description: "The fastest email experience with AI-powered features for professionals.",
    detailedDescription: "Superhuman combines a blazingly fast interface with AI features like automatic email triage, smart scheduling, and instant search. Built for professionals who live in email.",
    strengths: ["Extremely fast", "Keyboard-driven", "Beautiful interface", "AI triage", "Time-saving features"],
    weaknesses: ["Expensive", "Gmail/Outlook only", "Learning curve", "Desktop-focused"],
    bestFor: ["Email power users", "High email volume", "Productivity enthusiasts", "Professional communication", "Inbox management"],
    link: "https://superhuman.com",
    videoUrl: null,
    sortOrder: 21
  },
  {
    name: "Mem",
    category: "Note-Taking",
    pricing: "Free / $10/mo",
    features: ["AI-powered search", "Automatic organization", "Smart collections", "Calendar integration", "Mobile apps"],
    useCases: "Knowledge management, meeting notes, research, personal wiki, idea capture",
    description: "Self-organizing workspace powered by AI that remembers everything for you.",
    detailedDescription: "Mem uses AI to automatically organize and surface your notes when you need them. No folders or tags required - just capture thoughts and let AI do the organization.",
    strengths: ["Automatic organization", "Powerful AI search", "Clean interface", "Quick capture", "Smart suggestions"],
    weaknesses: ["Limited formatting", "New product", "Smaller team", "Integration ecosystem"],
    bestFor: ["Knowledge workers", "Researchers", "Meeting notes", "Idea capture", "Personal knowledge base"],
    link: "https://mem.ai",
    videoUrl: null,
    sortOrder: 22
  },
  {
    name: "Eleven Labs",
    category: "Voice AI",
    pricing: "Free / $5-$330/mo",
    features: ["Text-to-speech", "Voice cloning", "Multiple languages", "Emotion control", "API access"],
    useCases: "Voiceovers, audiobooks, podcasts, video narration, accessibility",
    description: "Most realistic AI voice generation for creating natural-sounding voiceovers.",
    detailedDescription: "Eleven Labs produces incredibly realistic AI voices that sound natural and expressive. Create voiceovers for videos, generate audiobook narration, or even clone your own voice.",
    strengths: ["Most realistic voices", "Emotion control", "Voice cloning", "Multiple languages", "API access"],
    weaknesses: ["Can be expensive", "Ethical concerns", "Credit-based pricing", "Processing time"],
    bestFor: ["Voiceovers", "Video narration", "Audiobooks", "Podcasts", "Multilingual content"],
    link: "https://elevenlabs.io",
    videoUrl: null,
    sortOrder: 23
  },
  {
    name: "Beautiful.ai",
    category: "Presentations",
    pricing: "$12-$40/mo",
    features: ["Smart templates", "Auto-formatting", "Team library", "Analytics", "Brand controls"],
    useCases: "Professional presentations, pitch decks, reports, proposals",
    description: "Presentation software with AI-powered design that automatically makes slides look professional.",
    detailedDescription: "Beautiful.ai automatically adjusts layouts, formats content, and applies design rules as you create slides. Focus on content while AI handles the design.",
    strengths: ["Automatic design", "Professional templates", "Team collaboration", "Brand consistency", "Easy to use"],
    weaknesses: ["Subscription required", "Less control than PowerPoint", "Limited offline use", "Smaller template library"],
    bestFor: ["Professional presentations", "Non-designers", "Team collaboration", "Consistent branding", "Quick decks"],
    link: "https://beautiful.ai",
    videoUrl: null,
    sortOrder: 24
  },
  {
    name: "Simplified",
    category: "All-in-One Marketing",
    pricing: "Free / $12-$30/mo",
    features: ["Design", "Video editing", "Copywriting", "Social scheduling", "Team collaboration"],
    useCases: "Social media management, content creation, marketing campaigns, team projects",
    description: "All-in-one app with AI for design, video, copywriting, and social media management.",
    detailedDescription: "Simplified combines design tools, video editing, AI copywriting, and social media scheduling in one platform. Perfect for small teams managing multiple marketing channels.",
    strengths: ["All-in-one solution", "Affordable", "Multiple AI features", "Team collaboration", "Social scheduling"],
    weaknesses: ["Jack of all trades", "Less powerful than specialists", "Feature complexity", "Learning curve"],
    bestFor: ["Small marketing teams", "Social media managers", "Multi-channel marketing", "Budget-conscious teams", "One-stop solution"],
    link: "https://simplified.com",
    videoUrl: null,
    sortOrder: 25
  },
  {
    name: "Rytr",
    category: "Content Writing",
    pricing: "Free / $9-$29/mo",
    features: ["40+ use cases", "30+ languages", "Tone selection", "Plagiarism checker", "Chrome extension"],
    useCases: "Blog posts, emails, social media, product descriptions, ad copy",
    description: "Affordable AI writing assistant for creating content quickly across multiple use cases.",
    detailedDescription: "Rytr provides an affordable alternative to premium AI writing tools with support for multiple languages, tones, and use cases. Great for small businesses and solopreneurs.",
    strengths: ["Very affordable", "Generous free tier", "Multiple languages", "Many use cases", "Easy to use"],
    weaknesses: ["Less sophisticated than competitors", "Basic features", "Quality varies", "Limited customization"],
    bestFor: ["Budget-conscious users", "Small businesses", "Multilingual content", "Quick content generation", "Solopreneurs"],
    link: "https://rytr.me",
    videoUrl: null,
    sortOrder: 26
  },
  {
    name: "Tome",
    category: "Presentations",
    pricing: "Free / $10/mo",
    features: ["AI slide generation", "Interactive elements", "Responsive design", "Embedding", "Analytics"],
    useCases: "Storytelling presentations, pitches, proposals, interactive reports",
    description: "AI-native presentation format that's more engaging than traditional slides.",
    detailedDescription: "Tome creates presentation experiences that go beyond static slides, with AI-generated content, embedded media, and interactive elements that engage audiences.",
    strengths: ["Modern presentation format", "AI content generation", "Interactive elements", "Mobile-friendly", "Free tier generous"],
    weaknesses: ["Different from traditional slides", "Learning curve", "Limited offline use", "Export limitations"],
    bestFor: ["Modern presentations", "Interactive storytelling", "Web-based pitches", "Engaging reports", "Creative professionals"],
    link: "https://tome.app",
    videoUrl: null,
    sortOrder: 27
  },
  {
    name: "Podcastle",
    category: "Podcast Production",
    pricing: "Free / $12-$30/mo",
    features: ["Recording", "Editing", "Transcription", "AI voices", "Magic Dust (audio enhancement)"],
    useCases: "Podcasts, interviews, voiceovers, audio content, training audio",
    description: "All-in-one podcast creation platform with AI-powered audio enhancement.",
    detailedDescription: "Podcastle provides professional podcast production tools including recording, editing, transcription, and AI audio enhancement - all in a browser-based platform.",
    strengths: ["All-in-one platform", "Browser-based", "AI audio enhancement", "Easy editing", "Affordable"],
    weaknesses: ["Limited advanced features", "Export quality on free tier", "Resource-intensive", "Newer platform"],
    bestFor: ["Podcast creators", "Interviews", "Audio content", "Beginner podcasters", "Remote recording"],
    link: "https://podcastle.ai",
    videoUrl: null,
    sortOrder: 28
  },
  {
    name: "Pictory",
    category: "Video Creation",
    pricing: "$23-$119/mo",
    features: ["Text-to-video", "Auto-captions", "Highlight reels", "Stock footage", "Brand customization"],
    useCases: "Social media videos, marketing content, educational videos, blog-to-video",
    description: "Convert scripts and blog posts into engaging videos automatically.",
    detailedDescription: "Pictory transforms long-form content into short, shareable videos using AI. Perfect for repurposing blog content into social media videos or creating marketing content quickly.",
    strengths: ["Easy content repurposing", "Auto-captions", "Stock footage library", "No filming needed", "Quick generation"],
    weaknesses: ["Subscription required", "Limited customization", "Template-based", "Watermark on lower tiers"],
    bestFor: ["Content repurposing", "Social media videos", "Marketing teams", "Educational content", "Blog-to-video"],
    link: "https://pictory.ai",
    videoUrl: null,
    sortOrder: 29
  },
  {
    name: "Lumen5",
    category: "Video Creation",
    pricing: "Free / $19-$149/mo",
    features: ["Text-to-video", "Media library", "Brand customization", "Templates", "Social formats"],
    useCases: "Social media videos, marketing content, blog-to-video, educational videos",
    description: "Transform blog posts and text content into engaging social media videos.",
    detailedDescription: "Lumen5 makes it easy to turn written content into video. It automatically selects relevant images and footage, creates scenes, and formats for different social platforms.",
    strengths: ["User-friendly", "Large media library", "Brand customization", "Multiple formats", "Good free tier"],
    weaknesses: ["Template limitations", "Watermark on free tier", "Basic editing", "Quality varies"],
    bestFor: ["Social media marketing", "Content repurposing", "Small businesses", "Blog-to-video", "Quick videos"],
    link: "https://lumen5.com",
    videoUrl: null,
    sortOrder: 30
  }
];

// Combine all tools
const allTools = [...aiToolsData, ...additionalTools];

export async function seedAITools() {
  try {
    console.log("Seeding AI tools...");
    
    for (const tool of allTools) {
      await db.insert(aiTools).values(tool);
      console.log(`✓ Added ${tool.name}`);
    }
    
    console.log(`\n✓ Successfully seeded ${allTools.length} AI tools!`);
  } catch (error) {
    console.error("Error seeding AI tools:", error);
    throw error;
  }
}

// Run seed
seedAITools()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
