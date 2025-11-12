import { useState } from "react";
import { ExternalLink, Search, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
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
import type { AITool } from "@shared/schema";

const categories = ["All", "Conversational AI", "Image Generation", "Productivity", "Content Writing", "Developer Tools", "Automation", "Writing Assistant", "Transcription", "Video/Audio Editing", "Presentations", "Research", "Video Creation", "Meeting Assistant", "Email Management", "Note-Taking", "Voice AI", "All-in-One Marketing", "Design", "Podcast Production"];

export default function AITools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const { data: tools = [], isLoading } = useQuery<AITool[]>({
    queryKey: ["/api/ai-tools", { category: categoryFilter, search: searchQuery }],
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
          <SelectTrigger className="w-full md:w-[240px]" data-testid="select-category">
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
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading AI tools...</p>
        </div>
      )}

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
              {!isLoading && tools.map((tool) => (
                <TableRow key={tool.id} data-testid={`tool-row-${tool.id}`}>
                  <TableCell className="font-medium">
                    <Link href={`/ai-tools/${tool.id}`}>
                      <button className="hover:text-primary transition-colors">
                        {tool.name}
                      </button>
                    </Link>
                  </TableCell>
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
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/ai-tools/${tool.id}`}>
                        <Button variant="ghost" size="sm" data-testid={`button-details-${tool.id}`}>
                          Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(tool.link, "_blank")}
                        data-testid={`button-visit-${tool.id}`}
                      >
                        Visit
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {!isLoading && tools.map((tool) => (
          <Card key={tool.id} data-testid={`tool-card-${tool.id}`} className="hover-elevate">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link href={`/ai-tools/${tool.id}`}>
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors">{tool.name}</h3>
                  </Link>
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
                  {tool.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {tool.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tool.features.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Use Cases</p>
                <p className="text-sm line-clamp-2">{tool.useCases}</p>
              </div>
              <Link href={`/ai-tools/${tool.id}`}>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoading && tools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tools found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
