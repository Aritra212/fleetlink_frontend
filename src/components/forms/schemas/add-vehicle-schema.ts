import * as z from "zod";

export const AddVehicleSchema = z.object({
  vehicle_name: z
    .string()
    .min(2, { error: "Vehicle name must be of atleast 2 characters" }),
  capacity: z.coerce.number().gt(0, { error: "Enter a valid capacity" }),
  tyres_no: z.coerce.number().gt(3, { error: "Tyre numbers must be >= 4" }),
});

export type IAddVehicleForm = z.input<typeof AddVehicleSchema>;
