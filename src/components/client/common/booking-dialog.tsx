"use client";
import ErrorPage from "@/app/(client)/error/page";
import { ButtonLoading } from "@/components/common/button-loading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/date/date-popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/date/date-select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FormInput,
  FormInputDateTimePickerV2,
  FormSelectObject,
} from "@/lib/form-custom-shadcn";
import { cn, toLocalISOString } from "@/lib/utils";
import { bookingService } from "@/services/booking-service";
import { serviceService } from "@/services/service-service";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCameraOutline } from "react-icons/io5";
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

export function BookingDialog() {
  const [loading, setLoading] = useState(false);

  const query: ServiceGetAllQuery = {
    isPagination: false,
    isNotNullSlug: true,
    isDeleted: [false],
  };

  const { data: services = [], error } = useQuery({
    queryKey: ["fetchServices", query],
    queryFn: async () => {
      const res = await serviceService.fetchAll(query);
      return res.data?.results;
    },
  });

  if (error) {
    return <ErrorPage />;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      console.log("check_form", values);
      const date = toLocalISOString(values.bookingDate);
      const updatedValues = {
        ...values,
        bookingDate: date,
      };
      console.log("check_output", updatedValues);
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

  const [time, setTime] = useState<string>("05:00");
    const [date, setDate] = useState<Date | null>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IoCameraOutline className="text-[#FFF] cursor-pointer  text-[40px]" />
      </DialogTrigger>

      <DialogContent className="shadow-lg sm:max-w-[425px] md:max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center">
                  Vui lòng điền thông tin của bạn để
                  <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                    Như My
                  </span>{" "}
                  có thể liên hệ qua email và số điện thoại! ✈️
                </h4>
              </DialogTitle>
            </DialogHeader>

            <div className="mx-auto w-full">
              <div className="grid gap-1">
              <div className="flex justify-start gap-3">
                  <FormField
                    control={form.control}
                    name="bookingDate"
                    render={({ field }) => {
                      const [time, setTime] = useState<string>("05:00");
                      const [date, setDate] = useState<Date | null>(null);

                      return (
                        <FormItem className="flex flex-col w-full">
                          <FormLabel>Ngày hẹn</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    `${format(field.value, "PPP")}, ${time}`
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 flex items-start"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={date || field.value}
                                onSelect={(selectedDate) => {
                                  const [hours, minutes] = time.split(":");
                                  selectedDate?.setHours(
                                    parseInt(hours),
                                    parseInt(minutes)
                                  );
                                  setDate(selectedDate!);
                                  field.onChange(selectedDate);
                                }}
                                fromYear={2000}
                                toYear={new Date().getFullYear()}
                                disabled={(date) =>
                                  Number(date) <
                                    Date.now() - 1000 * 60 * 60 * 24 ||
                                  Number(date) >
                                    Date.now() + 1000 * 60 * 60 * 24 * 30
                                }
                              />
                              <Select
                                defaultValue={time}
                                onValueChange={(newTime) => {
                                  setTime(newTime);
                                  if (date) {
                                    const [hours, minutes] = newTime.split(":");
                                    const newDate = new Date(date.getTime());
                                    newDate.setHours(
                                      parseInt(hours),
                                      parseInt(minutes)
                                    );
                                    setDate(newDate);
                                    field.onChange(newDate);
                                  }
                                }}
                                open={true}
                              >
                                <SelectTrigger className="font-normal focus:ring-0 w-[120px] my-4 mr-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border-none shadow-none mr-2 fixed top-2 left-0">
                                  <ScrollArea className="h-[15rem]">
                                    {Array.from({ length: 96 }).map((_, i) => {
                                      const hour = Math.floor(i / 4)
                                        .toString()
                                        .padStart(2, "0");
                                      const minute = ((i % 4) * 15)
                                        .toString()
                                        .padStart(2, "0");
                                      return (
                                        <SelectItem
                                          key={i}
                                          value={`${hour}:${minute}`}
                                        >
                                          {hour}:{minute}
                                        </SelectItem>
                                      );
                                    })}
                                  </ScrollArea>
                                </SelectContent>
                              </Select>
                            </PopoverContent>
                          </Popover>
                          {/* <FormDescription>Set your date and time.</FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {/* <FormInputDateTimePickerV2
                  form={form}
                  disabled={false}
                  name="bookingDate"
                  label="Ngày đến Nhu My Studio"
                  placeholder="Chọn ngày"
                /> */}
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
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Đóng
                </Button>
              </DialogClose>
              {loading ? (
                <ButtonLoading />
              ) : (
                <Button type="submit" disabled={loading}>
                  Booking
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
