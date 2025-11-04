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
import { userService } from "@/services/user-serice";
import { useState, useMemo } from "react";
import { UserGetAllQuery } from "@/types/cqrs/queries/user-query";

interface AuthorSelectProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

export function AuthorSelect<TFieldValues extends FieldValues>({
  form,
  name,
}: AuthorSelectProps<TFieldValues>) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const query: UserGetAllQuery = useMemo(
    () => ({
      pagination: {
        isPagingEnabled: true,
        pageSize: 10,
        pageNumber: 1,
      },
      isDeleted: false,
      email: debouncedSearch || undefined,
    }),
    [debouncedSearch]
  );

  const { data: authors = [], isFetching } = useQuery({
    queryKey: ["fetchAuthors", query],
    queryFn: async () => {
      const res = await userService.getAll(query);
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
          <FormLabel>Author</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value ?? undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {authors.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.email ?? option.username}
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
