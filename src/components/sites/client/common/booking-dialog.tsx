"use client";
import { ButtonLoading } from "@/components/_common/button-loading";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { LiquidGlassCard } from "@/components/liquid-glass";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  FormInput,
  FormInputDateTimePickerV2,
  FormInputDateTimePickerV3,
  FormSelectObject,
} from "@/lib/utils/form-custom-shadcn";
import { serviceBookingService } from "@/services/service-booking-service";
import { serviceService } from "@/services/service-service";
import { ServiceBookingCreateCommand } from "@/types/cqrs/commands/service-booking-command";
import { ServiceGetAllQuery } from "@/types/cqrs/queries/service-query";
import { Status } from "@/types/models/business-result";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCameraOutline } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  customerEmail: z.string().email().nullable().optional(),
  customerName: z.string().min(1, "Họ và tên không được để trống"),
  customerPhone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  userId: z.string().nullable().optional(),
  serviceId: z.string().min(1, "Service ID is required").nullable().optional(),
  appointmentDate: z.date(),
});

export function BookingDialog() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const query: ServiceGetAllQuery = {
    pagination: {
      isPagingEnabled: false,
    },
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
      const res = await serviceService.getAll(query);
      return res.data?.results;
    },
    refetchOnWindowFocus: false,
  });

  if (isError) {
    console.log("Error fetching:", error);
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const utcString = values.appointmentDate.toISOString();
      const updatedValues: ServiceBookingCreateCommand = {
        ...values,
        appointmentDate: utcString,
      };
      const response = await serviceBookingService.create(updatedValues);
      if (response.status != Status.OK) {
        toast.error(response.error?.detail);
        return;
      }

      toast.success(
        "Booking thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
      );
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>
          <div className="relative z-30 w-full">
            <IoCameraOutline className="text-[#FFF] cursor-pointer text-[35px]" />
          </div>
        </span>
      </DialogTrigger>

      {/* <DialogContent className="bg-transparent border-none shadow-none w-full sm:max-w-[500px] md:max-w-2xl mx-auto "> */}
      <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl sm:max-w-[500px] md:max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* <LiquidGlassCard
          draggable={false}
          glowIntensity="sm"
          shadowIntensity="sm"
          borderRadius="12px"
          blurIntensity="sm"
          className="p-8 text-background"
        >
          <div className="relative z-30 w-full">
          
          </div>
        </LiquidGlassCard> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6"
          >
            <DialogHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                  <IoCameraOutline className="w-8 h-8 " />
                </div>
              </div>

              <DialogTitle className="text-2xl font-semibold">
                Đặt lịch chụp ảnh
              </DialogTitle>

              <p className="text-sm leading-relaxed">
                Vui lòng điền thông tin để{" "}
                <span className="font-semibold">Như My Studio</span> có thể liên
                hệ và tư vấn cho bạn.
              </p>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4">
              {/* Date Selection */}
              <div className="grid grid-cols-1 gap-4">
                <h3 className="text-lg font-medium  flex items-center gap-2">
                  <svg
                    className="w-5 h-5 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Thời gian hẹn
                </h3>
                <FormInputDateTimePickerV3
                  label={"Ngày và giờ"}
                  name={"appointmentDate"}
                  form={form}
                />
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 gap-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <svg
                    className="w-5 h-5 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Thông tin cá nhân
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormInput
                    form={form}
                    name="customerName"
                    label="Họ và tên"
                    placeholder="Nhập họ và tên đầy đủ"
                  />
                  <FormInput
                    form={form}
                    name="customerPhone"
                    label="Số điện thoại"
                    placeholder="Ví dụ: 0987654321"
                  />
                </div>

                <FormInput
                  form={form}
                  name="customerEmail"
                  label="Email (tùy chọn)"
                  placeholder="email@example.com"
                  className="placeholder-white"
                />
              </div>

              {/* Service Selection */}
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-lg font-medium  flex items-center gap-2">
                  <IoCameraOutline className="w-5 h-5 " />
                  Dịch vụ chụp ảnh
                </h3>
                <FormSelectObject
                  form={form}
                  name="serviceId"
                  label="Chọn gói dịch vụ"
                  options={services}
                  selectLabel="name"
                  selectValue="id"
                  placeholder="Chọn gói dịch vụ phù hợp"
                />
              </div>
            </div>
            <DialogFooter className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Đóng
                </Button>
              </DialogClose>

              {loading ? (
                <div className="flex-1">
                  <ButtonLoading />
                </div>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Đặt lịch
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
