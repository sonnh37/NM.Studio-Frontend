"use client";
import { ButtonLoading } from "@/components/_common/button-loading";
import ErrorSystem from "@/components/_common/errors/error-system";
import {LoadingPageComponent} from "@/components/_common/loading-page";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormInput,
  FormInputDateTimePickerV2,
  FormSelectObject,
} from "@/lib/form-custom-shadcn";
import { toLocalISOString } from "@/lib/utils";
import { bookingService } from "@/services/booking-service";
import { serviceService } from "@/services/service-service";
import { BookingCreateCommand } from "@/types/commands/booking-command";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().nullable().optional(),
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  userId: z.string().nullable().optional(),
  serviceId: z.string().min(1, "Service ID is required").nullable().optional(),
  bookingDate: z.date(),
});

export function BookingModal() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const query: ServiceGetAllQuery = {
    isPagination: false,
    isDeleted: false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    data: services = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchServices", query],
    queryFn: async () => {
      const res = await serviceService.fetchAll(query);
      return res.data?.results;
    },
  });

  if (isLoading) return <LoadingPageComponent />;

  if (isError) {
    console.log("Error fetching:", error);
    return <ErrorSystem />;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const date = toLocalISOString(values.bookingDate);
      const updatedValues: BookingCreateCommand = {
        ...values,
        bookingDate: date,
      };
      const response = await bookingService.create(updatedValues);
      if (response.status != 1) throw new Error(response.message);

      toast.success(response.message);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto shadow-lg p-6 my-16 bg-white dark:bg-neutral-800 rounded-lg">
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-6">
        NHẬN TƯ VẤN CHI TIẾT
      </h4>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4">
            <FormInputDateTimePickerV2
              form={form}
              disabled={false}
              name="bookingDate"
              label="Ngày hẹn"
              placeholder="Chọn ngày"
            />

            <FormInput
              form={form}
              name="fullName"
              label="Họ và tên"
              placeholder="Nhập họ và tên"
            />

            <FormInput
              form={form}
              name="email"
              label="Email (Nếu có)"
              placeholder=""
            />

            <FormInput
              form={form}
              name="phone"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
            />

            <FormSelectObject
              form={form}
              name="serviceId"
              label="Dịch vụ"
              options={services}
              selectLabel="name"
              selectValue="id"
              placeholder="Chọn dịch vụ"
            />
          </div>

          <div className="flex justify-end space-x-4">
            {loading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit" disabled={loading}>
                Booking
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
