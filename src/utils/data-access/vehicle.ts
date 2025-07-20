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

export async function getAvailableVehicles(
  searchParams: Record<string, string | string[] | undefined>
) {
  const query = new URLSearchParams();

  // Map frontend keys to backend expected names
  if (typeof searchParams.capacity === "string") {
    query.set("capacityRequired", searchParams.capacity);
  }

  if (typeof searchParams.from === "string") {
    query.set("fromPincode", searchParams.from);
  }

  if (typeof searchParams.to === "string") {
    query.set("toPincode", searchParams.to);
  }

  if (typeof searchParams.date_time === "string") {
    query.set("startTime", searchParams.date_time);
  }

  const res = await fetch(
    `${env.SERVER_URL}/api/vehicles/available?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const err = await res.json();
    return { data: null, error: err.error || "Something went wrong" };
  }

  const data = await res.json();
  return { data, error: null };
}
