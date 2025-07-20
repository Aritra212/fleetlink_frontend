"use client";

import { IVehicleCard } from "@/common/common.interfaces";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VehicleCard from "@/components/vehicle-card";
import useUser from "@/lib/hooks/use-user";
import { getBookingsByCustomer } from "@/utils/data-access/vehicle";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BookingsPage() {
  const [myBookings, setMyBookings] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?._id) return;

      const { data, error } = await getBookingsByCustomer(user._id);
      if (error) return toast.error(error);
      setMyBookings(data);
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="flex flex-col justify-start items-center space-y-10 h-full py-10 overflow-y-auto">
      <div className="max-w-7xl min-w-xl md:min-w-5xl">
        <div className="flex gap-4 w-fit items-center">
          <Logo withText />
        </div>

        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <p className="text-xl font-semibold">My Bookings</p>
            <p className="text-muted-foreground">
              {myBookings.length ?? 0} record(s) Available
            </p>
          </div>
          <Link href={"/"}>
            <Button variant={"outline"} size={"lg"}>
              <MoveLeft className="size-5" />
              Back To Home
            </Button>
          </Link>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[60vh] ">
          {myBookings?.length > 0 ? (
            (myBookings as unknown as IVehicleCard[]).map((cardData) => (
              <VehicleCard vehicleData={cardData} isBooked key={cardData._id} />
            ))
          ) : (
            <p className="text-center mt-10 sm:col-span-2">No data to show</p>
          )}
        </div>
      </div>
    </div>
  );
}
