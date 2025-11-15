import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be minimum 2 characters.")
    .max(64, "Name exceeded 64 characters."),
  type: z
    .string()
    .min(1, "Please choose a type.")
    .refine((val) => val !== "auto", {
      message: "Auto detection is not allowed.",
    }),
  frequency: z
    .string()
    .min(1, "Please choose a frequency.")
    .refine((val) => val !== "auto", {
      message: "Auto detection is not allowed.",
    }),
  price: z.number(),
  renewal_date: z.iso.date(),
});

export const editSchema = z.object({
  id: z.number({
    error: (issue) =>
      issue.input === undefined ? "id is required." : "id must be a number.",
  }),
  name: z
    .string()
    .min(8, "Name must be minimum 8 characters.")
    .max(64, "Name exceeded 64 characters."),
  type: z
    .string()
    .min(1, "Please choose a type.")
    .refine((val) => val !== "auto", {
      message: "Auto detection is not allowed.",
    }),
  frequency: z
    .string()
    .min(1, "Please choose a frequency.")
    .refine((val) => val !== "auto", {
      message: "Auto detection is not allowed.",
    }),
  price: z.number(),
  renewal_date: z.iso.date(),
});

export type FormPayload = z.infer<typeof formSchema>;
export type EditPayload = z.infer<typeof editSchema>;
