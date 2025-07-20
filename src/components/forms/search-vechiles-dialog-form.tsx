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
import {
  ISearchVechilesForm,
  SearchVechilesSchema,
} from "./schemas/search-vechiles-schema";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function SearchVechilesDialogForm({ children }: Props) {
  const form = useForm<ISearchVechilesForm>({
    resolver: zodResolver(SearchVechilesSchema),
    defaultValues: {
      capacity: 0,
      date_time: "",
      from: "",
      to: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: ISearchVechilesForm) => {
    const params = new URLSearchParams();

    if ((values.capacity as number) > 0)
      params.set("capacity", String(values.capacity));
    if (values.date_time) params.set("date_time", values.date_time as string);
    if (values.from) params.set("from", values.from);
    if (values.to) params.set("to", values.to);

    router.push(`/vehicles?${params.toString()}`);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center pt-6">
            Search Available Vehicles
          </DialogTitle>
          <DialogDescription className="text-center">
            Find vehicles that match your capacity and route requirements
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <div className="grid grid-cols-2 gap-4">
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
                        value={field.value as number}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date & Type</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        min={0}
                        placeholder="Select a date"
                        {...field}
                        value={field.value as string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form Pincode</FormLabel>
                    <FormControl>
                      <Input min={0} placeholder="Enter a pincode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Pincode</FormLabel>
                    <FormControl>
                      <Input min={0} placeholder="Enter a pincode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-center py-6">
              <Button
                type="submit"
                className="w-64 h-12 text-lg"
                disabled={isLoading}
                loading={isLoading}
              >
                Search Vehciles
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
