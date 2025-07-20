import { IVehicleCard } from "@/common/common.interfaces";
import SearchVechilesDialogForm from "@/components/forms/search-vechiles-dialog-form";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VehicleCard from "@/components/vehicle-card";
import { getAvailableVehicles } from "@/utils/data-access/vehicle";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VehiclesPage({ searchParams }: Props) {
  const _searchParams = await searchParams;
  const { data: vehicleCards, error } = await getAvailableVehicles(
    _searchParams
  );

  if (error) toast.error(error);

  return (
    <div className="flex flex-col justify-start items-center space-y-10 h-full py-10 overflow-y-auto">
      <div className="max-w-7xl min-w-xl md:min-w-5xl">
        <div className="flex gap-4 w-fit items-center">
          <Logo withText />
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <p className="text-xl font-semibold">Search Results</p>
            <p className="text-muted-foreground">
              {vehicleCards.length ?? 0} Vehicles Available
            </p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[60vh] ">
          {vehicleCards?.length > 0 ? (
            (vehicleCards as unknown as IVehicleCard[]).map((cardData) => (
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
