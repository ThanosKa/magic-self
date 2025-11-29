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
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex-1 space-y-3">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl print:text-3xl">
            {name}
          </h1>
          <p className="text-lg text-muted-foreground">{shortAbout}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          )}
          {contacts?.email && (
            <a
              href={`mailto:${contacts.email}`}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              {contacts.email}
            </a>
          )}
          {contacts?.phone && (
            <a
              href={`tel:${contacts.phone}`}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              {contacts.phone}
            </a>
          )}
        </div>

        {socialLinks.length > 0 && (
          <div className="flex gap-2 print:hidden">
            {socialLinks.map(({ url, icon: Icon, label }) => (
              <Button
                key={label}
                variant="outline"
                size="sm"
                className="h-9 gap-2 hover:bg-accent hover:text-accent-foreground transition-all"
                asChild
              >
                <a
                  href={`${url}?ref=${SITE_CONFIG.referralParam}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{label}</span>
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>

      {profileImageUrl && (
        <Avatar className="h-24 w-24 shrink-0 ring-2 ring-border ring-offset-2 ring-offset-background print:h-20 print:w-20 print:ring-1">
          <AvatarImage
            src={profileImageUrl || "/placeholder.svg"}
            alt={name}
          />
          <AvatarFallback className="text-xl font-semibold">{initials}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
