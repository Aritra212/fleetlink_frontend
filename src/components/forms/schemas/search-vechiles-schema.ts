import * as z from "zod";

export const SearchVechilesSchema = z.object({
  capacity: z.coerce.number().gt(0, { error: "Enter a valid capacity" }),
  from: z.string().regex(/^\d{6}$/, { message: "Invalid Pincode" }),
  to: z.string().regex(/^\d{6}$/, { message: "Invalid Pincode" }),
  date_time: z.coerce.date(),
});

export type ISearchVechilesForm = z.input<typeof SearchVechilesSchema>;
