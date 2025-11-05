import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/lib/form-custom-shadcn";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface InformationBaseCardProps {
  form: any;
  initialData?: any | null;
}

export const InformationBaseCard: React.FC<InformationBaseCardProps> = ({
  form,
  initialData,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormInput
              form={form}
              name="createdBy"
              label="Created By"
              placeholder="N/A"
              disabled={true}
            />
          </div>
          <div className="grid gap-3">
            <Label>Created Date</Label>
            <Button
              type="button"
              disabled={true}
              variant={"outline"}
              className={cn(
                "w-full flex flex-row justify-between pl-3 text-left font-normal text-muted-foreground"
              )}
            >
              {initialData?.lastUpdatedDate ? (
                format(initialData.lastUpdatedDate, "dd/MM/yyyy")
              ) : (
                <span>{format(new Date(), "dd/MM/yyyy")}</span>
              )}
              <CalendarIcon className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
