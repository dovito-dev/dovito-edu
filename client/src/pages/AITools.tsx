import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const aiTools = [
  {
    id: 1,
    name: "ChatGPT",
    category: "Conversational AI",
    pricing: "Free / $20/mo",
    features: ["Natural Language", "Code Generation", "Multi-turn Conversations"],
    useCases: "Content creation, coding assistance, research",
    link: "https://chat.openai.com",
  },
  {
    id: 2,
    name: "Midjourney",
    category: "Image Generation",
    pricing: "$10-60/mo",
    features: ["High Quality Images", "Artistic Styles", "Upscaling"],
    useCases: "Digital art, marketing materials, concept design",
    link: "https://midjourney.com",
  },
  {
    id: 3,
    name: "Notion AI",
    category: "Productivity",
    pricing: "$10/mo",
    features: ["Writing Assistant", "Summarization", "Translation"],
    useCases: "Note-taking, documentation, project management",
    link: "https://notion.so",
  },
  {
    id: 4,
    name: "Jasper",
    category: "Content Writing",
    pricing: "$49-125/mo",
    features: ["SEO Optimization", "Templates", "Brand Voice"],
    useCases: "Marketing copy, blog posts, social media",
    link: "https://jasper.ai",
  },
  {
    id: 5,
    name: "GitHub Copilot",
    category: "Developer Tools",
    pricing: "$10/mo",
    features: ["Code Completion", "Multi-language", "Context Aware"],
    useCases: "Software development, code review, debugging",
    link: "https://github.com/features/copilot",
  },
];

const categories = ["All", "Conversational AI", "Image Generation", "Productivity", "Content Writing", "Developer Tools"];
const pricingFilters = ["All", "Free", "Paid", "Freemium"];

export default function AITools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [pricingFilter, setPricingFilter] = useState("All");

  const filteredTools = aiTools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.useCases.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || tool.category === categoryFilter;
    const matchesPricing = pricingFilter === "All" || 
      (pricingFilter === "Free" && tool.pricing.includes("Free")) ||
      (pricingFilter === "Paid" && !tool.pricing.includes("Free")) ||
      (pricingFilter === "Freemium" && tool.pricing.includes("Free") && tool.pricing.includes("/"));
    
    return matchesSearch && matchesCategory && matchesPricing;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-4xl mb-2">AI Tools Directory</h1>
        <p className="text-lg text-muted-foreground">
          Discover and explore the best AI tools for your workflow
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-tools"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[200px]" data-testid="select-category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={pricingFilter} onValueChange={setPricingFilter}>
          <SelectTrigger className="w-full md:w-[200px]" data-testid="select-pricing">
            <SelectValue placeholder="Pricing" />
          </SelectTrigger>
          <SelectContent>
            {pricingFilters.map((filter) => (
              <SelectItem key={filter} value={filter}>
                {filter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden md:block">
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Use Cases</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTools.map((tool) => (
                <TableRow key={tool.id} data-testid={`tool-row-${tool.id}`}>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tool.category}</Badge>
                  </TableCell>
                  <TableCell>{tool.pricing}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 2).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {tool.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{tool.features.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{tool.useCases}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(tool.link, "_blank")}
                      data-testid={`button-visit-${tool.id}`}
                    >
                      Visit
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {filteredTools.map((tool) => (
          <Card key={tool.id} data-testid={`tool-card-${tool.id}`}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{tool.name}</h3>
                  <Badge variant="secondary" className="mt-1">{tool.category}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(tool.link, "_blank")}
                  data-testid={`button-visit-mobile-${tool.id}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pricing</p>
                <p className="text-sm">{tool.pricing}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Features</p>
                <div className="flex flex-wrap gap-1">
                  {tool.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Use Cases</p>
                <p className="text-sm">{tool.useCases}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tools found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
