import { IAddVehicleForm } from "@/components/forms/schemas/add-vehicle-schema";

export interface IVehicleCard {
  _id: string;
  duration: string;
  name: string;
  capacityKg: number;
  tyres: number;
}
