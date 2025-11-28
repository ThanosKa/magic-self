"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy, ExternalLink, PartyPopper } from "lucide-react"
import { SITE_CONFIG } from "@/lib/config"

interface PopupSiteLiveProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  username: string | null
  profileUrl: string | null
}

export function PopupSiteLive({ open, onOpenChange, username, profileUrl }: PopupSiteLiveProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!profileUrl) return

    await navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <PartyPopper className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl">Your site is live!</DialogTitle>
          <DialogDescription className="text-center">
            Congratulations! Your {SITE_CONFIG.name} profile is now public and can be shared with anyone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Input readOnly value={profileUrl || ""} className="font-mono text-sm" />
            <Button variant="outline" size="icon" onClick={handleCopy} className="shrink-0 bg-transparent">
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {profileUrl && (
              <Button className="flex-1" asChild>
                <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Site
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
