"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface AddSkillDialogProps {
  onAdd: (skill: string) => void;
}

export function AddSkillDialog({ onAdd }: AddSkillDialogProps) {
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState("");

  const handleAdd = () => {
    if (skill.trim()) {
      onAdd(skill.trim());
      setSkill("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
          <DialogDescription>
            Enter a skill to add to your resume.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="skill">Skill</Label>
          <Input
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="React, TypeScript, etc."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!skill.trim()}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
