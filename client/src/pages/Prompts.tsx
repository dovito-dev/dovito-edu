import { useState } from "react";
import { Copy, Download, Search, Check, Star, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareButtons } from "@/components/ShareButtons";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { type Prompt } from "@shared/schema";

export default function Prompts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: prompts = [], isLoading } = useQuery<Prompt[]>({
    queryKey: ["/api/prompts"],
  });

  const categories = ["All", ...Array.from(new Set(prompts.map((p) => p.category)))];

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = categoryFilter === "All" || prompt.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast({ description: "Prompt copied to clipboard!" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (prompt: Prompt) => {
    const blob = new Blob([`${prompt.title}\n\n${prompt.content}`], { type: "text/plain" });
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
        {isLoading && <div className="text-center py-8 col-span-full">Loading prompts...</div>}
        {!isLoading && prompts.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <Lightbulb className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No prompts available yet. Check back soon!</p>
            </CardContent>
          </Card>
        )}
        {!isLoading && filteredPrompts.map((prompt) => (
          <Card key={prompt.id} className="flex flex-col" data-testid={`prompt-card-${prompt.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{prompt.category}</Badge>
                  {prompt.featured === 1 && (
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
              </div>
              <CardTitle className="text-lg">{prompt.title}</CardTitle>
              <CardDescription className="line-clamp-3 mt-2">
                {prompt.content}
              </CardDescription>
              {prompt.tags && prompt.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {prompt.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(prompt.content, prompt.id)}
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

      {!isLoading && filteredPrompts.length === 0 && prompts.length > 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No prompts found matching your search</p>
        </div>
      )}
    </div>
  );
}
