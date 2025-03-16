"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { subscribeToWaitlist } from "~/app/actions";
import { Button } from "~/components/ui/button";
import { Form } from "./ui/form";
import { LoaderCircle } from "lucide-react";

const waitlistInput = z.object({
  email: z.string().email({ message: "Insira um email válido!" }),
});

type WaitlistInput = z.infer<typeof waitlistInput>;

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistInput),
  });

  const handleSubmit = async (values: WaitlistInput) => {
    setIsSubmitting(true);
    try {
      // await subscribeToWaitlist(values.email);
      const promise = new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });

      await promise;
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto w-full max-w-xl"
      >
        <div className="flex flex-col gap-2 rounded-full p-1 backdrop-blur-sm sm:flex-row sm:bg-white/10">
          <input
            autoComplete="off"
            placeholder="Preencha com seu melhor email"
            className="h-10 w-full appearance-none rounded-full border-0 border-none bg-white/10 px-6 text-white shadow-none outline-none ring-0 placeholder:text-gray-400 focus:border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:border-0 active:border-none sm:bg-transparent"
            {...form.register("email")}
          />
          <Button
            type="submit"
            className="my-auto rounded-full bg-white px-8 text-primary hover:bg-gray-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex gap-1">
                <LoaderCircle className="h-12 w-12 animate-spin" />
                Enviando email
              </span>
            ) : (
              "Seja notificado"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
