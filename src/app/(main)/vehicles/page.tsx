import { IVehicleCard } from "@/common/common.interfaces";
import SearchVechilesDialogForm from "@/components/forms/search-vechiles-dialog-form";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VehicleCard from "@/components/vehicle-card";
import { Home, MoveLeft } from "lucide-react";
import Link from "next/link";

const SampleVehicleCards: IVehicleCard[] = [
  {
    _id: "1a2b3c4d",
    duration: "1h",
    vehicle_name: "Toyota HiAce",
    capacity: 12,
    tyres_no: 4,
  },
  {
    _id: "2b3c4d5e",
    duration: "5h",
    vehicle_name: "Mercedes Sprinter",
    capacity: 15,
    tyres_no: 6,
  },
  {
    _id: "3c4d5e6f",
    duration: "10h",
    vehicle_name: "Ford Transit",
    capacity: 10,
    tyres_no: 4,
  },
  {
    _id: "4d5e6f7g",
    duration: "3h",
    vehicle_name: "Isuzu NPR",
    capacity: 20,
    tyres_no: 6,
  },
  {
    _id: "5e6f7g8h",
    duration: "7h",
    vehicle_name: "Mitsubishi Fuso",
    capacity: 18,
    tyres_no: 6,
  },
  {
    _id: "6f7g8h9i",
    duration: "2h",
    vehicle_name: "Tata Ace",
    capacity: 4,
    tyres_no: 4,
  },
];

export default function VehiclesPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-10 h-full py-10 overflow-y-auto">
      <div className="max-w-7xl min-w-xl md:min-w-5xl">
        <div className="flex gap-4 w-fit items-center">
          <Logo withText />
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <p className="text-xl font-semibold">Search Results</p>
            <p className="text-muted-foreground">0 Vehicles Available</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href={"/"}>
              <Button variant={"outline"} size={"lg"}>
                <MoveLeft className="size-5" />
                Back To Home
              </Button>
            </Link>
            <SearchVechilesDialogForm>
              <Button size={"lg"}>Search Vehicles</Button>
            </SearchVechilesDialogForm>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[60vh]">
          {SampleVehicleCards?.length > 0 ? (
            SampleVehicleCards.map((cardData) => (
              <VehicleCard vehicleData={cardData} key={cardData._id} />
            ))
          ) : (
            <p className="text-center mt-10 sm:col-span-2">No data to show</p>
          )}
        </div>
      </div>
    </div>
  );
}
