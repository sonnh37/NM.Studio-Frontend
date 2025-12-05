"use client";
import { ButtonLoading } from "@/components/_common/button-loading";
import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormInput,
  FormInputDateTimePickerV3,
  FormSelectObject,
} from "@/lib/utils/form-custom-shadcn";
import { serviceBookingService } from "@/services/service-booking-service";
import { serviceService } from "@/services/service-service";
import { ServiceBookingCreateCommand } from "@/types/cqrs/commands/service-booking-command";
import { ServiceBookingStatus } from "@/types/entities/service-booking";
import { ServiceGetAllQuery } from "@/types/cqrs/queries/service-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Status } from "@/types/models/business-result";
import { motion } from "framer-motion";
import { toLocalISOString } from "@/lib/utils/string-utils";
import { Calendar, Mail, Phone, User } from "lucide-react";

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
    pagination: {
      isPagingEnabled: false,
      pageNumber: 1,
      pageSize: 3,
    },
    sorting: {
      sortDirection: 1,
      sortField: "createdDate",
    },
    isDeleted: false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      serviceId: "",
      bookingDate: new Date(),
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
      const command: ServiceBookingCreateCommand = {
        ...values,
        appointmentDate: date,
      };
      const response = await serviceBookingService.create(command);
      if (response.status != Status.OK) {
        toast.error(response.error?.detail);
        return;
      }

      toast.success(
        "Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
      );
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-22 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-px w-8 bg-gray-300"></div>
            <Calendar className="h-4 w-4 text-gray-400" />
            <div className="h-px w-8 bg-gray-300"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
            Đặt Lịch Tư Vấn
          </h2>
          <p className="text-gray-600 text-sm tracking-wide max-w-lg mx-auto">
            Để lại thông tin và chúng tôi sẽ liên hệ với bạn trong thời gian sớm
            nhất
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-white border border-gray-200 p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                {/* Date Picker */}
                <div>
                  <label className="text-sm font-light text-gray-700 mb-2 block">
                    <Calendar className="inline h-3 w-3 mr-1" />
                    Ngày hẹn
                  </label>
                  <FormInputDateTimePickerV3
                    form={form}
                    disabled={false}
                    name="bookingDate"
                    placeholder="Chọn ngày và giờ"
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label className="text-sm font-light text-gray-700 mb-2 block">
                    <User className="inline h-3 w-3 mr-1" />
                    Họ và tên
                  </label>
                  <FormInput
                    form={form}
                    name="fullName"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-sm font-light text-gray-700 mb-2 block">
                    <Mail className="inline h-3 w-3 mr-1" />
                    Email (Nếu có)
                  </label>
                  <FormInput
                    form={form}
                    name="email"
                    placeholder="example@gmail.com"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="text-sm font-light text-gray-700 mb-2 block">
                    <Phone className="inline h-3 w-3 mr-1" />
                    Số điện thoại
                  </label>
                  <FormInput
                    form={form}
                    name="phone"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                {/* Service Field */}
                <div>
                  <label className="text-sm font-light text-gray-700 mb-2 block">
                    Dịch vụ quan tâm
                  </label>
                  <FormSelectObject
                    form={form}
                    name="serviceId"
                    options={services}
                    selectLabel="name"
                    selectValue="id"
                    placeholder="Chọn dịch vụ"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {loading ? (
                    <ButtonLoading className="w-full py-6" />
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full py-6 text-sm tracking-wider font-light rounded-none "
                    >
                      GỬI YÊU CẦU
                    </Button>
                  )}
                </div>

                {/* Note */}
                <p className="text-xs text-gray-500 text-center pt-4">
                  Chúng tôi cam kết bảo mật thông tin của bạn
                </p>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
