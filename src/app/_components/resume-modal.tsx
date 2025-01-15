"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Select } from "~/components/form/select";
import { SelectItem } from "~/components/ui/select";
import { Input } from "~/components/form/input";

export const ResumeModal = () => {
  const formSchema = z.object({
    title: z.string(),
    experience: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (d) => {
    console.log("d", d);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create new resume</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Create a resume</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <Input
                name="title"
                label="Resume name"
                placeholder="Enter here..."
                required
              />

              <Select name="experience" placeholder="Select...">
                <SelectItem value="0-1">0-1 years</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
              </Select>

              <div className="space-y-4">
                <button
                  type="button"
                  className="flex items-center text-sm font-medium text-primary"
                >
                  Import your resume from linkedin →
                </button>
                <button
                  type="button"
                  className="flex items-center text-sm font-medium text-primary"
                >
                  Import your existing resume ▼
                </button>
                <div className="space-y-2 rounded-lg border-2 border-dashed p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Upload PDF, DOCx resume file
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex h-5 w-5 items-center justify-center">
                    ℹ️
                  </div>
                  <p>
                    This process may take up to 60 seconds. Please be patient
                    and keep this page open.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="target">Target your resume</Label>
                  <Switch id="target" />
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="flex h-5 w-5 items-center justify-center">
                    ✓
                  </div>
                  <p>
                    A targeted resume is a resume tailored to a specific job
                    opening. You have a significantly higher chance of getting
                    an interview when you make it clear you have the experience
                    required for the job.
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>

              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
