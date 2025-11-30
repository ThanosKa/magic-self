"use client";

import type {
  ResumeData,
  WorkExperience,
  Education,
  Project,
} from "@/lib/schemas/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Plus, Trash2, X } from "lucide-react";
import { useState, lazy, Suspense } from "react";

const AddSkillDialog = lazy(() =>
  import("@/components/resume/add-skill-dialog").then((mod) => ({
    default: mod.AddSkillDialog,
  }))
);

interface EditResumeProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  profileImageUrl?: string | null;
}

export function EditResume({ data, onChange }: EditResumeProps) {
  const [openWorkItems, setOpenWorkItems] = useState<number[]>([0]);
  const [openProjectItems, setOpenProjectItems] = useState<number[]>([0]);
  const [openEduItems, setOpenEduItems] = useState<number[]>([0]);

  const updateHeader = (field: string, value: string | string[]) => {
    onChange({
      ...data,
      header: { ...data.header, [field]: value },
    });
  };

  const updateContacts = (field: string, value: string) => {
    onChange({
      ...data,
      header: {
        ...data.header,
        contacts: { ...data.header.contacts, [field]: value },
      },
    });
  };

  const updateWorkExperience = (
    index: number,
    field: keyof WorkExperience,
    value: string | null
  ) => {
    const updated = [...data.workExperience];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, workExperience: updated });
  };

  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      company: "",
      link: "",
      location: "",
      contract: "Full-time",
      title: "",
      start: new Date().toISOString().split("T")[0],
      end: null,
      description: "",
    };
    onChange({ ...data, workExperience: [...data.workExperience, newWork] });
    setOpenWorkItems([...openWorkItems, data.workExperience.length]);
  };

  const removeWorkExperience = (index: number) => {
    onChange({
      ...data,
      workExperience: data.workExperience.filter((_, i) => i !== index),
    });
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, education: updated });
  };

  const addEducation = () => {
    const newEdu: Education = {
      school: "",
      degree: "",
      start: new Date().getFullYear().toString(),
      end: new Date().getFullYear().toString(),
    };
    onChange({ ...data, education: [...data.education, newEdu] });
    setOpenEduItems([...openEduItems, data.education.length]);
  };

  const removeEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, i) => i !== index),
    });
  };

  const addSkill = (skill: string) => {
    if (!data.header.skills.includes(skill)) {
      updateHeader("skills", [...data.header.skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    updateHeader(
      "skills",
      data.header.skills.filter((s) => s !== skill)
    );
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, projects: updated });
  };

  const addProject = () => {
    const newProject: Project = {
      name: "",
      description: "",
      link: "",
      technologies: [],
      date: "",
      highlights: [],
    };
    onChange({ ...data, projects: [...data.projects, newProject] });
    setOpenProjectItems([...openProjectItems, data.projects.length]);
  };

  const removeProject = (index: number) => {
    onChange({
      ...data,
      projects: data.projects.filter((_, i) => i !== index),
    });
  };

  const addProjectTechnology = (index: number, tech: string) => {
    const project = data.projects[index];
    if (!project.technologies.includes(tech)) {
      updateProject(index, "technologies", [...project.technologies, tech]);
    }
  };

  const removeProjectTechnology = (index: number, tech: string) => {
    const project = data.projects[index];
    updateProject(
      index,
      "technologies",
      project.technologies.filter((t) => t !== tech)
    );
  };

  const addProjectHighlight = (index: number) => {
    const project = data.projects[index];
    updateProject(index, "highlights", [...project.highlights, ""]);
  };

  const updateProjectHighlight = (
    projectIndex: number,
    highlightIndex: number,
    value: string
  ) => {
    const project = data.projects[projectIndex];
    const updated = [...project.highlights];
    updated[highlightIndex] = value;
    updateProject(projectIndex, "highlights", updated);
  };

  const removeProjectHighlight = (
    projectIndex: number,
    highlightIndex: number
  ) => {
    const project = data.projects[projectIndex];
    updateProject(
      projectIndex,
      "highlights",
      project.highlights.filter((_, i) => i !== highlightIndex)
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={data.header.name}
                onChange={(e) => updateHeader("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.header.location || ""}
                onChange={(e) => updateHeader("location", e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortAbout">Title / Short About</Label>
            <Textarea
              id="shortAbout"
              value={data.header.shortAbout}
              onChange={(e) => updateHeader("shortAbout", e.target.value)}
              placeholder="Senior Software Engineer at Company"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.header.contacts?.email || ""}
                onChange={(e) => updateContacts("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.header.contacts?.phone || ""}
                onChange={(e) => updateContacts("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                type="url"
                value={data.header.contacts?.github || ""}
                onChange={(e) => updateContacts("github", e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                type="url"
                value={data.header.contacts?.linkedin || ""}
                onChange={(e) => updateContacts("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">X</Label>
              <Input
                id="twitter"
                value={data.header.contacts?.twitter || ""}
                onChange={(e) => updateContacts("twitter", e.target.value)}
                placeholder="@username"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Skills</CardTitle>
          <Suspense
            fallback={
              <Button variant="outline" size="sm" disabled>
                Add Skill
              </Button>
            }
          >
            <AddSkillDialog onAdd={addSkill} />
          </Suspense>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.header.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {data.header.skills.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No skills added yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.summary}
            onChange={(e) => onChange({ ...data, summary: e.target.value })}
            placeholder="Write a brief professional summary..."
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Work Experience</CardTitle>
          <Button variant="outline" size="sm" onClick={addWorkExperience}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.workExperience.map((job, index) => (
            <Collapsible
              key={index}
              open={openWorkItems.includes(index)}
              onOpenChange={(open) => {
                if (open) {
                  setOpenWorkItems([...openWorkItems, index]);
                } else {
                  setOpenWorkItems(openWorkItems.filter((i) => i !== index));
                }
              }}
            >
              <div className="rounded-lg border">
                <div className="flex w-full items-center justify-between p-4 hover:bg-muted/50">
                  <CollapsibleTrigger className="flex-1 text-left">
                    <p className="font-medium">{job.title || "New Position"}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.company || "Company"}
                    </p>
                  </CollapsibleTrigger>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                      onClick={() => removeWorkExperience(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="space-y-4 border-t p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                          value={job.title}
                          onChange={(e) =>
                            updateWorkExperience(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={job.company}
                          onChange={(e) =>
                            updateWorkExperience(
                              index,
                              "company",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company URL</Label>
                        <Input
                          type="url"
                          value={job.link || ""}
                          onChange={(e) =>
                            updateWorkExperience(index, "link", e.target.value)
                          }
                          placeholder="https://company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={job.location}
                          onChange={(e) =>
                            updateWorkExperience(
                              index,
                              "location",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Contract Type</Label>
                        <Input
                          value={job.contract}
                          onChange={(e) =>
                            updateWorkExperience(
                              index,
                              "contract",
                              e.target.value
                            )
                          }
                          placeholder="Full-time, Part-time, Contract"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={job.start}
                          onChange={(e) =>
                            updateWorkExperience(index, "start", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={job.end || ""}
                          onChange={(e) =>
                            updateWorkExperience(
                              index,
                              "end",
                              e.target.value || null
                            )
                          }
                          placeholder="Leave empty if current"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={job.description}
                        onChange={(e) =>
                          updateWorkExperience(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
          {data.workExperience.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No work experience added yet.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Projects</CardTitle>
          <Button variant="outline" size="sm" onClick={addProject}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.projects.map((project, index) => (
            <Collapsible
              key={index}
              open={openProjectItems.includes(index)}
              onOpenChange={(open) => {
                if (open) {
                  setOpenProjectItems([...openProjectItems, index]);
                } else {
                  setOpenProjectItems(
                    openProjectItems.filter((i) => i !== index)
                  );
                }
              }}
            >
              <div className="rounded-lg border">
                <div className="flex w-full items-center justify-between p-4 hover:bg-muted/50">
                  <CollapsibleTrigger className="flex-1 text-left">
                    <p className="font-medium">
                      {project.name || "New Project"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.technologies.slice(0, 3).join(", ") ||
                        "No technologies"}
                    </p>
                  </CollapsibleTrigger>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                      onClick={() => removeProject(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="space-y-4 border-t p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input
                          value={project.name}
                          onChange={(e) =>
                            updateProject(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Date (YYYY-MM)</Label>
                        <Input
                          value={project.date || ""}
                          onChange={(e) =>
                            updateProject(index, "date", e.target.value)
                          }
                          placeholder="2024-03"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Project Link</Label>
                      <Input
                        type="url"
                        value={project.link || ""}
                        onChange={(e) =>
                          updateProject(index, "link", e.target.value)
                        }
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) =>
                          updateProject(index, "description", e.target.value)
                        }
                        rows={3}
                        placeholder="Brief description of the project..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Technologies</Label>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="gap-1 pr-1"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() =>
                                removeProjectTechnology(index, tech)
                              }
                              className="ml-1 rounded-full p-0.5 hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        <Suspense
                          fallback={
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="h-6 text-xs"
                            >
                              Add
                            </Button>
                          }
                        >
                          <AddSkillDialog
                            onAdd={(tech) => addProjectTechnology(index, tech)}
                          />
                        </Suspense>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Highlights / Achievements</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addProjectHighlight(index)}
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Add Highlight
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {project.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex gap-2">
                            <Input
                              value={highlight}
                              onChange={(e) =>
                                updateProjectHighlight(
                                  index,
                                  hIndex,
                                  e.target.value
                                )
                              }
                              placeholder="Key achievement or feature..."
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeProjectHighlight(index, hIndex)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
          {data.projects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No projects added yet.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Education</CardTitle>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.education.map((edu, index) => (
            <Collapsible
              key={index}
              open={openEduItems.includes(index)}
              onOpenChange={(open) => {
                if (open) {
                  setOpenEduItems([...openEduItems, index]);
                } else {
                  setOpenEduItems(openEduItems.filter((i) => i !== index));
                }
              }}
            >
              <div className="rounded-lg border">
                <div className="flex w-full items-center justify-between p-4 hover:bg-muted/50">
                  <CollapsibleTrigger className="flex-1 text-left">
                    <p className="font-medium">{edu.school || "New School"}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree || "Degree"}
                    </p>
                  </CollapsibleTrigger>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                      onClick={() => removeEducation(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="space-y-4 border-t p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>School / University</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) =>
                            updateEducation(index, "school", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(index, "degree", e.target.value)
                          }
                          placeholder="B.S. Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Year</Label>
                        <Input
                          value={edu.start}
                          onChange={(e) =>
                            updateEducation(index, "start", e.target.value)
                          }
                          placeholder="2018"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Year</Label>
                        <Input
                          value={edu.end}
                          onChange={(e) =>
                            updateEducation(index, "end", e.target.value)
                          }
                          placeholder="2022"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Score / GPA (Optional)</Label>
                        <Input
                          value={edu.score || ""}
                          onChange={(e) =>
                            updateEducation(index, "score", e.target.value)
                          }
                          placeholder="3.8 GPA, First Class Honours, etc."
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
          {data.education.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No education added yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
