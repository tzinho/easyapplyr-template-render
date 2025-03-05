import { z } from "zod";

export const dateSchema = z.string().transform((val) => {
  const date = new Date(val);
  if (isNaN(date.getTime())) {
    return null; // Or throw an error, depending on your needs.
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T03:00:00Z`;
});
