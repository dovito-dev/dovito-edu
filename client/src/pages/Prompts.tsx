import { useState } from "react";
import { Copy, Download, Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareButtons } from "@/components/ShareButtons";
import { useToast } from "@/hooks/use-toast";

const prompts = [
  {
    id: 1,
    category: "Content Creation",
    title: "Blog Post Outline Generator",
    prompt: "Create a detailed blog post outline for [TOPIC]. Include an engaging introduction, 5-7 main sections with subpoints, and a compelling conclusion. Target audience: [AUDIENCE]. Tone: [professional/casual/technical].",
  },
  {
    id: 2,
    category: "Code Review",
    title: "Code Analysis Request",
    prompt: "Review the following code and provide feedback on: 1) Code quality and readability, 2) Potential bugs or security issues, 3) Performance optimizations, 4) Best practices adherence. Code: [PASTE CODE HERE]",
  },
  {
    id: 3,
    category: "Marketing",
    title: "Social Media Campaign",
    prompt: "Create a 7-day social media campaign for [PRODUCT/SERVICE]. Include: daily post ideas, optimal posting times, relevant hashtags, and engagement strategies. Platform: [Instagram/LinkedIn/Twitter]. Target: [AUDIENCE].",
  },
  {
    id: 4,
    category: "Learning",
    title: "Concept Explanation",
    prompt: "Explain [COMPLEX CONCEPT] in simple terms that a beginner can understand. Use analogies, examples, and break it down into digestible parts. Include common misconceptions and practical applications.",
  },
  {
    id: 5,
    category: "Business",
    title: "Meeting Summary Template",
    prompt: "Summarize the following meeting notes into: 1) Key decisions made, 2) Action items with owners, 3) Open questions, 4) Next steps. Format as a professional memo. Notes: [PASTE NOTES HERE]",
  },
  {
    id: 6,
    category: "Data Analysis",
    title: "Data Insights Extraction",
    prompt: "Analyze this dataset and provide: 1) Key trends and patterns, 2) Notable outliers, 3) Actionable insights, 4) Recommendations for next steps. Data: [PASTE DATA OR DESCRIBE DATASET]",
  },
];

const categories = ["All", ...Array.from(new Set(prompts.map((p) => p.category)))];

export default function Prompts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || prompt.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (prompt: string, id: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    toast({ description: "Prompt copied to clipboard!" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (prompt: { title: string; prompt: string }) => {
    const blob = new Blob([`${prompt.title}\n\n${prompt.prompt}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prompt.title.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ description: "Prompt downloaded!" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-4xl mb-2">Prompt Library</h1>
        <p className="text-lg text-muted-foreground">
          Professional prompts ready to copy and use in your AI workflows
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-prompts"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={categoryFilter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(cat)}
              data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <Card key={prompt.id} className="flex flex-col" data-testid={`prompt-card-${prompt.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="secondary">{prompt.category}</Badge>
              </div>
              <CardTitle className="text-lg">{prompt.title}</CardTitle>
              <CardDescription className="line-clamp-3 mt-2">
                {prompt.prompt}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(prompt.prompt, prompt.id)}
                    data-testid={`button-copy-${prompt.id}`}
                  >
                    {copiedId === prompt.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(prompt)}
                    data-testid={`button-download-${prompt.id}`}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <ShareButtons title={`Check out this prompt: ${prompt.title}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No prompts found matching your search</p>
        </div>
      )}
    </div>
  );
}
