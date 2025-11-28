"use client"

import { useState, useEffect, useCallback } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Check, X, Loader2, Pencil } from "lucide-react"
import { toast } from "sonner"
import { MAX_USERNAME_LENGTH } from "@/lib/config"
import { cn } from "@/lib/utils"

interface UsernameEditorViewProps {
  username: string | null
  onUsernameUpdate: (username: string) => void
}

export function UsernameEditorView({ username, onUsernameUpdate }: UsernameEditorViewProps) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm" className="h-auto px-1 py-0.5 font-mono text-sm font-medium">
            {username || "set-username"}
            <Pencil className="ml-1.5 h-3 w-3 text-muted-foreground" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit Username</DrawerTitle>
            <DrawerDescription>Choose a unique username for your profile URL.</DrawerDescription>
          </DrawerHeader>
          <UsernameForm
            currentUsername={username}
            onSuccess={(newUsername) => {
              onUsernameUpdate(newUsername)
              setOpen(false)
            }}
            className="px-4"
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto px-1 py-0.5 font-mono text-sm font-medium">
          {username || "set-username"}
          <Pencil className="ml-1.5 h-3 w-3 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
          <DialogDescription>Choose a unique username for your profile URL.</DialogDescription>
        </DialogHeader>
        <UsernameForm
          currentUsername={username}
          onSuccess={(newUsername) => {
            onUsernameUpdate(newUsername)
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

interface UsernameFormProps {
  currentUsername: string | null
  onSuccess: (username: string) => void
  className?: string
}

function UsernameForm({ currentUsername, onSuccess, className }: UsernameFormProps) {
  const [newUsername, setNewUsername] = useState(currentUsername || "")
  const [isChecking, setIsChecking] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [availability, setAvailability] = useState<{
    available: boolean
    reason?: string
  } | null>(null)

  // Debounced availability check
  const checkAvailability = useCallback(
    async (value: string) => {
      if (!value || value === currentUsername) {
        setAvailability(null)
        return
      }

      setIsChecking(true)
      try {
        const res = await fetch(`/api/username/check?username=${encodeURIComponent(value)}`)
        const data = await res.json()
        setAvailability(data)
      } catch {
        setAvailability({ available: false, reason: "Failed to check availability" })
      } finally {
        setIsChecking(false)
      }
    },
    [currentUsername],
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      if (newUsername && newUsername !== currentUsername) {
        checkAvailability(newUsername)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [newUsername, currentUsername, checkAvailability])

  const handleSave = async () => {
    if (!availability?.available) return

    setIsSaving(true)
    try {
      const res = await fetch("/api/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update username")
      }

      toast.success("Username updated!")
      onSuccess(newUsername)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsSaving(false)
    }
  }

  const isValid = availability?.available && newUsername !== currentUsername
  const showError = availability && !availability.available && newUsername !== currentUsername

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="current-username">Current Username</Label>
        <Input id="current-username" value={currentUsername || "Not set"} disabled className="font-mono" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-username">New Username</Label>
        <div className="relative">
          <Input
            id="new-username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value.toLowerCase())}
            placeholder="your-username"
            maxLength={MAX_USERNAME_LENGTH}
            className={cn("pr-10 font-mono", showError && "border-destructive focus-visible:ring-destructive")}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isChecking && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            {!isChecking && isValid && <Check className="h-4 w-4 text-green-600" />}
            {!isChecking && showError && <X className="h-4 w-4 text-destructive" />}
          </div>
        </div>
        {showError && <p className="text-xs text-destructive">{availability.reason}</p>}
        <p className="text-xs text-muted-foreground">
          Only lowercase letters, numbers, and hyphens. Max {MAX_USERNAME_LENGTH} characters.
        </p>
      </div>

      <Button onClick={handleSave} disabled={!isValid || isSaving} className="w-full">
        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Username
      </Button>
    </div>
  )
}
