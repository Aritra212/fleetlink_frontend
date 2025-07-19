import { IAddVehicleForm } from "@/components/forms/schemas/add-vehicle-schema";

export interface IVehicleCard extends IAddVehicleForm {
  _id: string;
  duration: string;
}
