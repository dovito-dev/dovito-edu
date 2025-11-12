import { useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { SiYoutube, SiInstagram, SiX, SiLinkedin, SiTiktok, SiGlobe } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MediaProfile } from "@shared/schema";

const categories = ["All", "Business", "Marketing", "Technology", "Real Estate", "Finance", "Personal Development"];

export default function Media() {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const { data: profiles = [], isLoading } = useQuery<MediaProfile[]>({
    queryKey: ["/api/media-profiles", { category: categoryFilter }],
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-4xl mb-2">Recommended People & Creators</h1>
        <p className="text-lg text-muted-foreground">
          Discover influential creators, thought leaders, and experts worth following
        </p>
      </div>

      <div className="flex items-center gap-4">
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
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading profiles...</p>
        </div>
      )}

      {!isLoading && profiles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No profiles found yet.</p>
            <p className="text-sm text-muted-foreground">
              Check back soon - we're curating a list of amazing creators to follow!
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {!isLoading && profiles.map((profile) => (
          <Card key={profile.id} className="hover-elevate" data-testid={`profile-card-${profile.id}`}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile.avatar || undefined} alt={profile.name} />
                  <AvatarFallback className="text-lg">
                    {profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl" data-testid={`text-profile-name-${profile.id}`}>
                        {profile.name}
                      </CardTitle>
                      {profile.title && (
                        <CardDescription className="mt-1">{profile.title}</CardDescription>
                      )}
                    </div>
                    {profile.featured === 1 && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  {profile.category && (
                    <Badge variant="outline" className="mt-2">{profile.category}</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm" data-testid={`text-bio-${profile.id}`}>{profile.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {profile.youtubeUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(profile.youtubeUrl!, "_blank")}
                    data-testid={`button-youtube-${profile.id}`}
                  >
                    <SiYoutube className="h-4 w-4 text-red-600" />
                  </Button>
                )}
                {profile.instagramUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(profile.instagramUrl!, "_blank")}
                    data-testid={`button-instagram-${profile.id}`}
                  >
                    <SiInstagram className="h-4 w-4 text-pink-600" />
                  </Button>
                )}
                {profile.xUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(profile.xUrl!, "_blank")}
                    data-testid={`button-x-${profile.id}`}
                  >
                    <SiX className="h-4 w-4" />
                  </Button>
                )}
                {profile.linkedinUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(profile.linkedinUrl!, "_blank")}
                    data-testid={`button-linkedin-${profile.id}`}
                  >
                    <SiLinkedin className="h-4 w-4 text-blue-600" />
                  </Button>
                )}
                {profile.tiktokUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(profile.tiktokUrl!, "_blank")}
                    data-testid={`button-tiktok-${profile.id}`}
                  >
                    <SiTiktok className="h-4 w-4" />
                  </Button>
                )}
                {profile.websiteUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(profile.websiteUrl!, "_blank")}
                    data-testid={`button-website-${profile.id}`}
                  >
                    <SiGlobe className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
