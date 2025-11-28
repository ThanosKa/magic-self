import type { Header } from "@/lib/schemas/resume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

interface ResumeHeaderProps {
  header: Header;
  profileImageUrl?: string | null;
}

export function ResumeHeader({ header, profileImageUrl }: ResumeHeaderProps) {
  const { name, shortAbout, location, contacts } = header;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const socialLinks = [
    { url: contacts?.website, icon: Globe, label: "Website" },
    { url: contacts?.github, icon: Github, label: "GitHub" },
    { url: contacts?.linkedin, icon: Linkedin, label: "LinkedIn" },
    {
      url: contacts?.twitter
        ? `https://twitter.com/${contacts.twitter.replace("@", "")}`
        : undefined,
      icon: Twitter,
      label: "Twitter",
    },
  ].filter((link) => link.url);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        {profileImageUrl && (
          <Avatar className="h-20 w-20 print:h-16 print:w-16">
            <AvatarImage
              src={profileImageUrl || "/placeholder.svg"}
              alt={name}
            />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
        )}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl print:text-2xl">
            {name}
          </h1>
          <p className="text-muted-foreground">{shortAbout}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-sm text-muted-foreground">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {location}
              </span>
            )}
            {contacts?.email && (
              <a
                href={`mailto:${contacts.email}`}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {contacts.email}
              </a>
            )}
            {contacts?.phone && (
              <a
                href={`tel:${contacts.phone}`}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {contacts.phone}
              </a>
            )}
          </div>
        </div>
      </div>

      {socialLinks.length > 0 && (
        <div className="flex gap-1 print:hidden">
          {socialLinks.map(({ url, icon: Icon, label }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              asChild
            >
              <a
                href={`${url}?ref=${SITE_CONFIG.referralParam}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
