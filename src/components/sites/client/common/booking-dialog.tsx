"use client";
import { ButtonLoading } from "@/components/_common/button-loading";
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
import { toast } from "sonner";
import { z } from "zod";
import { Calendar, Mail, Phone, User, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { IoCameraOutline } from "react-icons/io5";

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
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const query: ServiceGetAllQuery = {
    pagination: {
      isPagingEnabled: false,
    },
    isDeleted: false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      serviceId: "",
      appointmentDate: new Date(),
    },
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
        "Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
      );
      form.reset();
      setOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>
          <div className="relative z-30 w-full">
            <IoCameraOutline className="text-[#FFF] cursor-pointer text-[30px]" />
          </div>
        </span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white border border-gray-200 p-0 overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="px-6 pt-8 pb-6 border-b border-gray-100">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <DialogTitle className="text-xl font-light text-gray-900 tracking-wide">
                  Đặt Lịch Chụp Ảnh
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-2 font-light">
                  Để lại thông tin để được tư vấn chi tiết
                </p>
              </motion.div>
            </DialogHeader>

            <div className="px-6 py-6 grid gap-4">
              {/* Date Field */}
              <div className="grid gap-2">
                <label className="text-sm font-light text-gray-700 flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Ngày và giờ hẹn
                </label>
                <FormInputDateTimePickerV3
                  name="appointmentDate"
                  form={form}
                  placeholder="Chọn ngày và giờ"
                />
              </div>

              {/* Personal Information */}
              <div className="grid gap-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-light text-gray-700 flex items-center gap-2">
                      <User className="h-3 w-3" />
                      Họ và tên
                    </label>
                    <FormInput
                      form={form}
                      name="customerName"
                      placeholder="Nhập họ và tên"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-light text-gray-700 flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      Số điện thoại
                    </label>
                    <FormInput
                      form={form}
                      name="customerPhone"
                      placeholder="0987654321"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-light text-gray-700 flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    Email (tùy chọn)
                  </label>
                  <FormInput
                    form={form}
                    name="customerEmail"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="grid gap-2">
                <label className="text-sm font-light text-gray-700 flex items-center gap-2">
                  <Camera className="h-3 w-3" />
                  Gói dịch vụ
                </label>
                <FormSelectObject
                  form={form}
                  name="serviceId"
                  options={services}
                  selectLabel="name"
                  selectValue="id"
                  placeholder="Chọn gói dịch vụ"
                />
              </div>
            </div>

            <DialogFooter className="grid grid-cols-1 px-6 py-6 border-t border-gray-100">
              <div className="flex w-full gap-4">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-light tracking-wider text-sm"
                  >
                    HỦY
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
                    className="flex-1 font-light tracking-wider text-sm"
                  >
                    GỬI YÊU CẦU
                  </Button>
                )}
              </div>

              <p className="text-xs text-gray-400 text-center w-full pt-4">
                Chúng tôi cam kết bảo mật thông tin của bạn
              </p>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
