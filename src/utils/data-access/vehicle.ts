import { IAddVehicleForm } from "@/components/forms/schemas/add-vehicle-schema";
import { env } from "@/lib/env";

export async function addVehicle(formData: IAddVehicleForm) {
  try {
    const res = await fetch(`${env.SERVER_URL}/api/vehicles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.vehicle_name,
        capacityKg: formData.capacity,
        tyres: formData.tyres_no,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return { error: err.error || "Failed to add vehicle", data: null };
    }

    const data = await res.json();

    return { data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Something went wrong" };
  }
}
