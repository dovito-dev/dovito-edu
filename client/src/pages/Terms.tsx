import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading font-bold text-4xl mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: November 2024</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acceptance of Terms</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            By accessing and using Dovito EDU, you accept and agree to be bound by the 
            terms and provision of this agreement.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Use License</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            Permission is granted to temporarily access the materials on Dovito EDU for 
            personal, non-commercial use only. This is the grant of a license, 
            not a transfer of title.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            You are responsible for maintaining the confidentiality of your account and 
            password. You agree to accept responsibility for all activities that occur 
            under your account.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modifications</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            Dovito EDU may revise these terms of service at any time without notice. 
            By using this platform, you are agreeing to be bound by the current version 
            of these terms of service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
