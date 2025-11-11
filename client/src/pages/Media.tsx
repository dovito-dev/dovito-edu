import { ExternalLink } from "lucide-react";
import { SiYoutube, SiInstagram, SiX, SiLinkedin, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mediaLinks = [
  {
    platform: "YouTube",
    icon: SiYoutube,
    followers: "12.5K subscribers",
    description: "Video tutorials, workshops, and educational content",
    url: "https://youtube.com/@dovitoedu",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    platform: "Instagram",
    icon: SiInstagram,
    followers: "8.3K followers",
    description: "Daily tips, infographics, and community highlights",
    url: "https://instagram.com/dovitoedu",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-950",
  },
  {
    platform: "X (Twitter)",
    icon: SiX,
    followers: "15.2K followers",
    description: "Latest updates, industry news, and quick tips",
    url: "https://x.com/dovitoedu",
    color: "text-foreground",
    bgColor: "bg-muted",
  },
  {
    platform: "LinkedIn",
    icon: SiLinkedin,
    followers: "6.8K connections",
    description: "Professional insights, case studies, and networking",
    url: "https://linkedin.com/company/dovitoedu",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    platform: "Facebook",
    icon: SiFacebook,
    followers: "9.1K likes",
    description: "Community discussions and event announcements",
    url: "https://facebook.com/dovitoedu",
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
];

export default function Media() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-4xl mb-2">Media Links</h1>
        <p className="text-lg text-muted-foreground">
          Connect with us across all platforms for the latest updates and resources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaLinks.map((media) => (
          <Card
            key={media.platform}
            className="hover-elevate transition-all"
            data-testid={`media-card-${media.platform.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <CardHeader>
              <div className={`p-3 rounded-lg ${media.bgColor} w-fit mb-3`}>
                <media.icon className={`h-8 w-8 ${media.color}`} />
              </div>
              <CardTitle>{media.platform}</CardTitle>
              <CardDescription className="font-medium text-foreground">
                {media.followers}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{media.description}</p>
              <Button
                className="w-full gap-2"
                onClick={() => window.open(media.url, "_blank")}
                data-testid={`button-visit-${media.platform.toLowerCase().replace(/\s+/g, "-")}`}
              >
                Visit {media.platform}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stay Connected</CardTitle>
          <CardDescription>
            Follow us on your favorite platforms to never miss an update
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Our social media channels feature exclusive content, early access to new workshops, 
            community Q&A sessions, and the latest developments in AI and education technology.
          </p>
          <p className="text-sm text-muted-foreground">
            Tag us in your posts and use <span className="font-mono text-foreground">#DovitoEDU</span> to 
            share your learning journey with the community!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
