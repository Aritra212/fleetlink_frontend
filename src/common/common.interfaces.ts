export interface IVehicleCard {
  _id: string;
  duration: string;
  name: string;
  capacityKg: number;
  tyres: number;
}

export interface IMyBookingCard {
  vehicleId: IVehicleCard;
  _id: string;
  fromPincode: string;
  toPincode: string;
  startTime: string;
  endTime: string;
}
