import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading font-bold text-4xl mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: November 2024</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            We collect information that you provide directly to us, including your name, 
            email address, and any other information you choose to provide when using 
            Dovito EDU platform.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            We use the information we collect to provide, maintain, and improve our services, 
            send you technical notices and support messages, and respond to your comments 
            and questions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Security</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            We take reasonable measures to help protect your personal information from loss, 
            theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            If you have any questions about this Privacy Policy, please contact us at 
            privacy@dovito.edu
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
