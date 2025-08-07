import z from "zod";

export const ticketSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character"),
  description: z.string().optional(),
  assignedTo: z.string().min(1, "Assigned is required"),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "REJECTED"]),
});
