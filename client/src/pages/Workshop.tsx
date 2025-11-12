import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareButtons } from "@/components/ShareButtons";

export default function Workshop() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-4xl mb-2">
            Dovito x Fairway Mortgage AI Workshop
          </h1>
          <p className="text-lg text-muted-foreground">
            Session 1: Talking to AI - Immersive Experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ShareButtons title="Check out this AI Workshop!" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session 1: Welcome to AI - The Future of Mortgage</CardTitle>
          <CardDescription>
            Interactive HTML presentation - Use arrow keys or touch to navigate through slides
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full bg-background rounded-b-lg overflow-hidden">
            <iframe
              src="/workshops/session1/index.html"
              className="w-full h-[calc(100vh-280px)] min-h-[600px] border-0"
              title="Session 1: Talking to AI - Immersive Experience"
              allowFullScreen
              loading="lazy"
              data-testid="iframe-session-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>More Sessions Coming Soon</CardTitle>
          <CardDescription>
            Additional workshop sessions will be available here as they're published.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Session 2: Understanding Large Language Models (LLMs)",
              "Session 3: AI Applications in Mortgage Operations",
              "Session 4: Prompt Engineering Mastery",
              "Session 5: AI-Powered Customer Service",
              "Session 6: Automating Document Review",
              "Session 7: Risk Assessment & Underwriting AI",
              "Session 8: Building AI Workflows with No-Code Tools",
              "Session 9: AI Ethics & Responsible Use",
              "Session 10: Content Creation with AI",
              "Session 11: Data Analysis & Insights",
              "Session 12: Your AI Action Plan"
            ].map((session, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-background border border-border opacity-60"
                data-testid={`session-placeholder-${index + 2}`}
              >
                <p className="font-medium text-sm text-muted-foreground">{session}</p>
                <p className="text-xs text-muted-foreground mt-2">Coming Soon</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
