import AddVehicleDialogForm from "@/components/forms/add-vehicle-dialog-form";
import SearchVechilesDialogForm from "@/components/forms/search-vechiles-dialog-form";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isUserActive } from "@/utils/data-access/auth";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const _isUserActive = await isUserActive();
  return (
    <div className="flex flex-col justify-center space-y-10 h-full">
      <div>
        <div className="flex text-5xl font-bold gap-3 items-center w-fit mx-auto">
          <Logo /> Fleetlink
        </div>
        <p className="max-w-xl text-center mx-auto">
          Streamline your logistics operations with our comprehensive vehicle
          booking and fleet management platform
        </p>

        <div className="flex gap-4 w-fit mx-auto mt-4">
          {_isUserActive ? (
            <Link href={"/profile"} className="w-fit mx-auto">
              <Button size={"lg"}>My Bookings</Button>
            </Link>
          ) : (
            <>
              <Link href={"/login"}>
                <Button size={"lg"}>Login</Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button variant={"outline"} size={"lg"}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-6 justify-center">
        <Card className="min-w-fit w-xs p-6">
          <CardHeader className="px-0">
            <CardTitle className="flex flex-col gap-y-2 items-center text-2xl">
              <Plus className="size-10 text-green-600 border-2 rounded-full border-green-600" />{" "}
              Add Vehicle
            </CardTitle>
            <CardDescription className="text-center">
              Register new vehicles to expand your fleet capacity
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center px-0">
            <AddVehicleDialogForm>
              <Button size={"lg"}>Add New Vehicle</Button>
            </AddVehicleDialogForm>
          </CardContent>
        </Card>

        <Card className="min-w-fit w-xs p-6">
          <CardHeader className="px-0">
            <CardTitle className="flex flex-col items-center text-2xl gap-y-2 ">
              <Search className="size-10 text-indigo-400 " /> Search & Book
              Vehicle
            </CardTitle>
            <CardDescription className="text-center">
              Find available vehicles and make bookings for your logistics needs
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center px-0">
            <SearchVechilesDialogForm>
              <Button size={"lg"}>Search Vehicles</Button>
            </SearchVechilesDialogForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
