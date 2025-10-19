import { FieldValues, FieldPath, UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { CategoryGetAllQuery } from "@/types/cqrs/queries/category-query";
import { categoryService } from "@/services/category-service";

interface CategorySelectProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

export function CategorySelect<TFieldValues extends FieldValues>({
  form,
  name,
}: CategorySelectProps<TFieldValues>) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const query: CategoryGetAllQuery = useMemo(
    () => ({
      pagination: {
        isPagingEnabled: true,
        pageSize: 10,
        pageNumber: 1,
      },
      isDeleted: false,
      name: debouncedSearch || undefined,
    }),
    [debouncedSearch]
  );

  const { data: categorys = [], isFetching } = useQuery({
    queryKey: ["fetchCategorys", query],
    queryFn: async () => {
      const res = await categoryService.getAll(query);
      return res.data?.results;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value ?? undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {categorys.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
                {isFetching && (
                  <div className="p-2 text-sm text-muted-foreground">
                    Loading...
                  </div>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
