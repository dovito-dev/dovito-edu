import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", { name, email, message });
    toast({ description: "Message sent! We'll get back to you soon." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading font-bold text-4xl mb-2">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Have a question? We'd love to hear from you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Email</CardTitle>
            <CardDescription>Send us an email anytime</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">support@dovito.edu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Mon-Fri 9am-5pm EST</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" data-testid="button-live-chat">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Response Time</CardTitle>
            <CardDescription>Typical response</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Within 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you as soon as possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-testid="input-contact-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-contact-email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                data-testid="textarea-contact-message"
              />
            </div>
            <Button type="submit" data-testid="button-send-message">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
