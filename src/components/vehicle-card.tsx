"use client";

import { IVehicleCard } from "@/common/common.interfaces";
import { Card, CardContent } from "./ui/card";
import { Clock, ShipWheel, Truck, Weight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import useUser from "@/lib/hooks/use-user";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { bookVehicle } from "@/utils/data-access/vehicle";

type Props = {
  vehicleData: IVehicleCard;
  isBooked?: boolean;
};
export default function VehicleCard({ vehicleData, isBooked }: Props) {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleBooking = async () => {
    const customerId = user?._id;
    const startTime = searchParams.get("date_time");
    const fromPincode = searchParams.get("from");
    const toPincode = searchParams.get("to");

    if (!customerId)
      return toast.info("Customer Id not found. Login and try again...", {
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });

    if (!startTime || !fromPincode || !toPincode) {
      return toast.error("Booking failed. Missing info.");
    }

    const rideDuration =
      Math.abs(parseInt(fromPincode) - parseInt(toPincode)) % 24 || 1;

    const end = new Date(
      new Date(startTime).getTime() + rideDuration * 60 * 60 * 1000
    );

    const { error } = await bookVehicle({
      vehicleId: vehicleData._id,
      customerId,
      fromPincode,
      toPincode,
      startTime,
      endTime: end.toISOString(),
    });

    if (error) return toast.error(error);
    toast.success("Vehicle booked successfully!");
    router.refresh();
  };

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
              {vehicleData.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Est. Duration: {vehicleData.duration}</span>
                </div>
              )}
            </div>
          </div>

          <Separator orientation="vertical" className="hidden md:block h-16" />

          <div className="flex flex-col gap-2">
            {!isBooked ? (
              <Button size={"lg"} onClick={handleBooking}>
                Book Now
              </Button>
            ) : (
              <Button size={"lg"} disabled>
                Booked
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
