import { IVehicleCard } from "@/common/common.interfaces";
import { Card, CardContent } from "./ui/card";
import { Clock, ShipWheel, Truck, Weight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

type Props = {
  vehicleData: IVehicleCard;
};
export default function VehicleCard({ vehicleData }: Props) {
  return (
    <Card key={vehicleData._id} className="border-l-4 border-l-blue-500 h-48">
      <CardContent className="p-6 my-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">{vehicleData.name}</h3>
              <Badge variant="secondary">Available</Badge>
            </div>

            <div className="flex gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-muted-foreground" />
                <span>
                  Capacity: {(vehicleData.capacityKg as number) ?? 0} KG
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShipWheel className="h-4 w-4 text-muted-foreground" />
                <span>Tyres: {(vehicleData.tyres as number) ?? 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Est. Duration: {vehicleData.duration}</span>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="hidden md:block h-16" />

          <div className="flex flex-col gap-2">
            <Button size={"lg"}>Book Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
