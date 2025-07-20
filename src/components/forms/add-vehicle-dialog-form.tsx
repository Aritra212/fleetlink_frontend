"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  AddVehicleSchema,
  IAddVehicleForm,
} from "./schemas/add-vehicle-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { addVehicle } from "@/utils/data-access/vehicle";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};
export default function AddVehicleDialogForm({ children }: Props) {
  const form = useForm<IAddVehicleForm>({
    resolver: zodResolver(AddVehicleSchema),
    defaultValues: {
      vehicle_name: "",
      capacity: 0,
      tyres_no: 4,
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (values: IAddVehicleForm) => {
    const { error } = await addVehicle(values);

    if (error) {
      return toast.error(error);
    }

    toast.success("Vehicle added successfully");
    form.reset();
    setOpen(false);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center pt-6">
            Add New Vehicle
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add new vehicle form
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="vehicle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vehicle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="e.g. 10"
                      {...field}
                      value={field.value as number | string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tyres_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number Of Tyres</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="e.g. 4"
                      {...field}
                      value={field.value as number | string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center py-6">
              <Button
                type="submit"
                className="w-64 h-12 text-lg"
                disabled={isLoading}
                loading={isLoading}
              >
                Add Vehcile
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
