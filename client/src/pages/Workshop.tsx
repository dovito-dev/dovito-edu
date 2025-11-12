import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Maximize2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShareButtons } from "@/components/ShareButtons";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Session {
  id: number;
  title: string;
  duration: string;
  slides: Slide[];
}

interface Slide {
  id: number;
  title: string;
  content: string;
  type: "title" | "content" | "bullets" | "quote";
}

const sessions: Session[] = [
  {
    id: 1,
    title: "Welcome to AI: The Future of Mortgage",
    duration: "45 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "Welcome to AI: The Future of Mortgage",
        content: "Dovito x Fairway Mortgage AI Workshop"
      },
      {
        id: 2,
        type: "content",
        title: "What We'll Cover Today",
        content: "Understanding AI and its transformative potential in the mortgage industry. Learn how artificial intelligence is reshaping customer service, underwriting, and operational efficiency."
      },
      {
        id: 3,
        type: "bullets",
        title: "Why AI Matters in Mortgage",
        content: "• Faster loan processing and approvals\n• Enhanced customer experience\n• Reduced operational costs\n• Better risk assessment\n• 24/7 customer support capabilities"
      },
      {
        id: 4,
        type: "quote",
        title: "Industry Impact",
        content: "AI is not replacing mortgage professionals - it's empowering them to focus on what humans do best: building relationships and providing personalized guidance."
      }
    ]
  },
  {
    id: 2,
    title: "Understanding Large Language Models (LLMs)",
    duration: "60 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "Understanding Large Language Models",
        content: "The Technology Behind ChatGPT and Modern AI"
      },
      {
        id: 2,
        type: "content",
        title: "What are LLMs?",
        content: "Large Language Models are AI systems trained on vast amounts of text data. They can understand context, generate human-like responses, and assist with complex tasks."
      },
      {
        id: 3,
        type: "bullets",
        title: "Popular LLMs in 2024",
        content: "• ChatGPT (OpenAI GPT-4)\n• Claude (Anthropic)\n• Gemini (Google)\n• Microsoft Copilot\n• Llama 3 (Meta)"
      },
      {
        id: 4,
        type: "content",
        title: "How LLMs Work",
        content: "LLMs analyze patterns in language to predict and generate text. They're trained on billions of parameters, allowing them to understand context and nuance in human communication."
      }
    ]
  },
  {
    id: 3,
    title: "AI Applications in Mortgage Operations",
    duration: "50 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "AI Applications in Mortgage Operations",
        content: "Practical Use Cases for Your Daily Work"
      },
      {
        id: 2,
        type: "bullets",
        title: "Document Processing & Analysis",
        content: "• Automated document verification\n• Income and asset analysis\n• Credit report interpretation\n• Property appraisal review\n• Fraud detection"
      },
      {
        id: 3,
        type: "bullets",
        title: "Customer Communication",
        content: "• 24/7 chatbots for FAQs\n• Email drafting assistance\n• Personalized loan recommendations\n• Multilingual support\n• Follow-up automation"
      },
      {
        id: 4,
        type: "content",
        title: "Real Results",
        content: "Companies using AI in mortgage operations report 40% faster processing times, 30% reduction in errors, and significantly improved customer satisfaction scores."
      }
    ]
  },
  {
    id: 4,
    title: "Prompt Engineering Mastery",
    duration: "55 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "Prompt Engineering Mastery",
        content: "Getting the Best Results from AI"
      },
      {
        id: 2,
        type: "content",
        title: "What is Prompt Engineering?",
        content: "The art and science of crafting effective instructions for AI systems. Good prompts lead to accurate, useful, and relevant responses."
      },
      {
        id: 3,
        type: "bullets",
        title: "Key Principles",
        content: "• Be specific and clear\n• Provide context and examples\n• Define the desired format\n• Set constraints and guidelines\n• Iterate and refine"
      },
      {
        id: 4,
        type: "content",
        title: "Example: Loan Explanation",
        content: "Bad: 'Explain FHA loans'\n\nGood: 'Explain FHA loans to a first-time homebuyer in simple terms, focusing on benefits, requirements, and the application process. Use a friendly, conversational tone and keep it under 200 words.'"
      }
    ]
  },
  {
    id: 5,
    title: "AI-Powered Customer Service",
    duration: "40 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "AI-Powered Customer Service",
        content: "Enhancing Client Relationships with Technology"
      },
      {
        id: 2,
        type: "bullets",
        title: "Chatbots & Virtual Assistants",
        content: "• Answer common questions instantly\n• Pre-qualify leads automatically\n• Schedule appointments\n• Provide rate quotes\n• Collect initial application data"
      },
      {
        id: 3,
        type: "bullets",
        title: "Email & Communication Tools",
        content: "• Draft personalized responses\n• Summarize long email threads\n• Translate to multiple languages\n• Suggest next best actions\n• Maintain consistent tone"
      },
      {
        id: 4,
        type: "quote",
        title: "The Human Touch",
        content: "AI handles routine inquiries, giving loan officers more time for complex consultations and relationship building - the irreplaceable human element."
      }
    ]
  },
  {
    id: 6,
    title: "Automating Document Review",
    duration: "50 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "Automating Document Review",
        content: "AI-Powered Analysis for Faster Decisions"
      },
      {
        id: 2,
        type: "content",
        title: "The Challenge",
        content: "Manual document review is time-consuming and prone to human error. Loan officers spend hours verifying pay stubs, tax returns, bank statements, and credit reports."
      },
      {
        id: 3,
        type: "bullets",
        title: "AI Solutions",
        content: "• Optical Character Recognition (OCR)\n• Automated data extraction\n• Income calculation verification\n• Compliance checking\n• Anomaly detection\n• Instant flagging of discrepancies"
      },
      {
        id: 4,
        type: "content",
        title: "Implementation",
        content: "Modern AI tools can process an entire loan file in minutes, extracting key data points and flagging potential issues for human review. This reduces processing time from days to hours."
      }
    ]
  },
  {
    id: 7,
    title: "Risk Assessment & Underwriting AI",
    duration: "55 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "Risk Assessment & Underwriting AI",
        content: "Smarter Decisions Through Machine Learning"
      },
      {
        id: 2,
        type: "bullets",
        title: "Traditional vs. AI Underwriting",
        content: "• Traditional: Rules-based, manual review\n• AI: Pattern recognition across millions of loans\n• Considers hundreds of variables\n• Identifies subtle risk indicators\n• Adapts to market changes"
      },
      {
        id: 3,
        type: "content",
        title: "Fair Lending Compliance",
        content: "AI models must be transparent and auditable. Modern systems are designed to avoid bias and ensure fair lending practices while improving accuracy."
      },
      {
        id: 4,
        type: "bullets",
        title: "Benefits",
        content: "• Faster approvals for qualified borrowers\n• More accurate risk pricing\n• Reduced default rates\n• Better portfolio performance\n• Consistent decision-making"
      }
    ]
  },
  {
    id: 8,
    title: "Building AI Workflows with No-Code Tools",
    duration: "65 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "Building AI Workflows with No-Code Tools",
        content: "Automate Without Writing Code"
      },
      {
        id: 2,
        type: "bullets",
        title: "Popular No-Code AI Platforms",
        content: "• Zapier AI\n• Make (Integromat)\n• n8n\n• Microsoft Power Automate\n• Google Workspace AI features"
      },
      {
        id: 3,
        type: "content",
        title: "Example Workflow: Lead Nurturing",
        content: "1. New lead fills out website form\n2. AI categorizes lead quality\n3. Sends personalized email sequence\n4. Schedules follow-up reminders\n5. Routes hot leads to loan officers\n6. All automated, no coding required"
      },
      {
        id: 4,
        type: "bullets",
        title: "What You Can Automate",
        content: "• Email responses and follow-ups\n• Data entry and CRM updates\n• Document organization\n• Report generation\n• Social media scheduling\n• Meeting scheduling"
      }
    ]
  },
  {
    id: 9,
    title: "AI Ethics & Responsible Use",
    duration: "45 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "AI Ethics & Responsible Use",
        content: "Using AI Safely and Responsibly"
      },
      {
        id: 2,
        type: "bullets",
        title: "Key Ethical Considerations",
        content: "• Data privacy and security\n• Bias and fairness\n• Transparency and explainability\n• Accountability for decisions\n• Human oversight requirements"
      },
      {
        id: 3,
        type: "bullets",
        title: "Data Protection Best Practices",
        content: "• Never share sensitive customer data with public AI tools\n• Use enterprise-grade AI with proper security\n• Anonymize data when possible\n• Follow GDPR, CCPA compliance\n• Maintain audit trails"
      },
      {
        id: 4,
        type: "quote",
        title: "The Golden Rule",
        content: "AI should augment human judgment, not replace it. Always review AI outputs before acting on them, especially in customer-facing situations."
      }
    ]
  },
  {
    id: 10,
    title: "Content Creation with AI",
    duration: "50 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "Content Creation with AI",
        content: "Marketing & Communication Made Easy"
      },
      {
        id: 2,
        type: "bullets",
        title: "What AI Can Help Create",
        content: "• Social media posts\n• Blog articles\n• Email newsletters\n• Video scripts\n• Property descriptions\n• Marketing copy"
      },
      {
        id: 3,
        type: "content",
        title: "Best Practices",
        content: "Always edit and personalize AI-generated content. Add your unique insights, local knowledge, and personal touch. AI provides the first draft - you provide the expertise."
      },
      {
        id: 4,
        type: "bullets",
        title: "Tools to Explore",
        content: "• ChatGPT for writing\n• Canva AI for graphics\n• Descript for video editing\n• Copy.ai for marketing\n• Grammarly for editing"
      }
    ]
  },
  {
    id: 11,
    title: "Data Analysis & Insights",
    duration: "55 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "Data Analysis & Insights",
        content: "Turn Numbers into Actionable Intelligence"
      },
      {
        id: 2,
        type: "bullets",
        title: "AI-Powered Analytics",
        content: "• Pipeline analysis and forecasting\n• Market trend identification\n• Customer behavior patterns\n• Performance metrics visualization\n• Predictive modeling"
      },
      {
        id: 3,
        type: "content",
        title: "Example: Market Analysis",
        content: "AI can analyze thousands of data points to identify: emerging markets, optimal pricing strategies, seasonal trends, competitor positioning, and customer preferences - all in minutes."
      },
      {
        id: 4,
        type: "bullets",
        title: "Tools for Mortgage Professionals",
        content: "• ChatGPT Advanced Data Analysis\n• Google Sheets AI features\n• Microsoft Excel Copilot\n• Tableau AI\n• Power BI with AI insights"
      }
    ]
  },
  {
    id: 12,
    title: "Your AI Action Plan",
    duration: "40 min",
    slides: [
      {
        id: 1,
        type: "title",
        title: "Your AI Action Plan",
        content: "Getting Started This Week"
      },
      {
        id: 2,
        type: "bullets",
        title: "Quick Wins: Start Tomorrow",
        content: "• Use ChatGPT to draft emails\n• Try AI for market research\n• Automate one repetitive task\n• Create social media content\n• Summarize long documents"
      },
      {
        id: 3,
        type: "bullets",
        title: "30-Day Goals",
        content: "• Set up AI email assistant\n• Implement chatbot on website\n• Create content calendar with AI\n• Build one automated workflow\n• Train team on AI tools"
      },
      {
        id: 4,
        type: "quote",
        title: "Final Thoughts",
        content: "The future of mortgage belongs to professionals who combine human expertise with AI capabilities. Start small, experiment often, and continuously learn. Welcome to the AI-powered future!"
      }
    ]
  }
];

export default function Workshop() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSession, setSelectedSession] = useState(1);
  
  const currentSession = sessions.find(s => s.id === selectedSession) || sessions[0];
  const totalSlides = currentSession.slides.length;
  const slide = currentSession.slides[currentSlide];

  const handleDownload = () => {
    console.log("Download session", selectedSession);
  };

  const handleFullscreen = () => {
    console.log("Enter fullscreen");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-4xl mb-2">
            Dovito x Fairway Mortgage AI Workshop
          </h1>
          <p className="text-lg text-muted-foreground">
            Interactive learning sessions on AI and automation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ShareButtons title="Check out this AI Workshop!" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Session {selectedSession}: {currentSession.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Slide {currentSlide + 1} of {totalSlides}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownload}
                    data-testid="button-download-session"
                    aria-label="Download session"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFullscreen}
                    data-testid="button-fullscreen"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-sessions-mobile">
                        <List className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Sessions</SheetTitle>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
                        <div className="space-y-2">
                          {sessions.map((session) => (
                            <button
                              key={session.id}
                              onClick={() => {
                                setSelectedSession(session.id);
                                setCurrentSlide(1);
                              }}
                              className={`w-full text-left p-3 rounded-lg transition-colors hover-elevate active-elevate-2 ${
                                selectedSession === session.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                              data-testid={`session-${session.id}`}
                            >
                              <p className="font-medium text-sm">Session {session.id}</p>
                              <p className="text-sm opacity-90 line-clamp-2">{session.title}</p>
                              <p className="text-xs opacity-75 mt-1">{session.duration}</p>
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-background to-muted rounded-lg flex items-center justify-center border border-border p-8 lg:p-12">
                {slide.type === "title" && (
                  <div className="text-center space-y-6">
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl">{slide.title}</h2>
                    <p className="text-xl lg:text-2xl text-muted-foreground">{slide.content}</p>
                  </div>
                )}
                {slide.type === "content" && (
                  <div className="space-y-6 max-w-3xl">
                    <h2 className="font-heading font-bold text-2xl lg:text-4xl">{slide.title}</h2>
                    <p className="text-lg lg:text-xl leading-relaxed">{slide.content}</p>
                  </div>
                )}
                {slide.type === "bullets" && (
                  <div className="space-y-6 max-w-3xl w-full">
                    <h2 className="font-heading font-bold text-2xl lg:text-4xl">{slide.title}</h2>
                    <div className="space-y-3">
                      {slide.content.split('\n').map((bullet, i) => (
                        <p key={i} className="text-lg lg:text-xl">{bullet}</p>
                      ))}
                    </div>
                  </div>
                )}
                {slide.type === "quote" && (
                  <div className="text-center space-y-6 max-w-3xl">
                    <h2 className="font-heading font-bold text-2xl lg:text-3xl mb-6">{slide.title}</h2>
                    <blockquote className="text-xl lg:text-2xl italic border-l-4 border-primary pl-6 py-2">
                      "{slide.content}"
                    </blockquote>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  data-testid="button-previous-slide"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentSlide + 1} / {totalSlides}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentSlide(Math.min(totalSlides - 1, currentSlide + 1))}
                  disabled={currentSlide === totalSlides - 1}
                  data-testid="button-next-slide"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle>All Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-2">
                  {sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => {
                        setSelectedSession(session.id);
                        setCurrentSlide(0);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors hover-elevate active-elevate-2 ${
                        selectedSession === session.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                      data-testid={`session-${session.id}`}
                    >
                      <p className="font-medium text-sm">Session {session.id}</p>
                      <p className="text-sm opacity-90 line-clamp-2">{session.title}</p>
                      <p className="text-xs opacity-75 mt-1">{session.duration}</p>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
