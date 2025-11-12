import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, ExternalLink, CheckCircle2, XCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { AITool } from "@shared/schema";

export default function AIToolDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: tool, isLoading } = useQuery<AITool>({
    queryKey: [`/api/ai-tools/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/ai-tools">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI Tools
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/ai-tools">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI Tools
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tool not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/ai-tools">
          <Button variant="ghost" size="sm" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to AI Tools
          </Button>
        </Link>
        <Button onClick={() => window.open(tool.link, "_blank")} data-testid="button-visit-tool">
          Visit {tool.name}
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="font-heading font-bold text-4xl mb-2" data-testid="text-tool-name">{tool.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" data-testid="badge-category">{tool.category}</Badge>
              <Badge variant="outline" data-testid="badge-pricing">{tool.pricing}</Badge>
            </div>
          </div>
        </div>
        <p className="text-lg text-muted-foreground" data-testid="text-description">
          {tool.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>About {tool.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {tool.detailedDescription && (
              <div>
                <p className="text-base leading-relaxed" data-testid="text-detailed-description">
                  {tool.detailedDescription}
                </p>
              </div>
            )}

            {tool.videoUrl && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Video Overview</h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    src={tool.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    data-testid="iframe-video"
                  />
                </div>
              </div>
            )}

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Strengths
              </h3>
              {tool.strengths && tool.strengths.length > 0 ? (
                <ul className="space-y-2">
                  {tool.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2" data-testid={`strength-${idx}`}>
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No strengths listed</p>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Weaknesses & Limitations
              </h3>
              {tool.weaknesses && tool.weaknesses.length > 0 ? (
                <ul className="space-y-2">
                  {tool.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start gap-2" data-testid={`weakness-${idx}`}>
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No weaknesses listed</p>
              )}
            </div>

            {tool.bestFor && tool.bestFor.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Best For
                  </h3>
                  <ul className="space-y-2">
                    {tool.bestFor.map((use, idx) => (
                      <li key={idx} className="flex items-start gap-2" data-testid={`best-for-${idx}`}>
                        <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tool.features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" data-testid={`feature-${idx}`}>
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm" data-testid="text-use-cases">{tool.useCases}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg" data-testid="text-pricing">{tool.pricing}</p>
              <Button
                className="w-full mt-4"
                onClick={() => window.open(tool.link, "_blank")}
                data-testid="button-learn-more"
              >
                Learn More
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
