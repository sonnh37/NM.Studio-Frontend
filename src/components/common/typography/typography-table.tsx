import { cn } from "@/lib/utils";

interface TypographyTableProps<T> {
  data: T[]; // Dữ liệu danh sách
  className?: string;
}

export const TypographyTable = <T,>({
  data,
  className,
}: TypographyTableProps<T>) => {
  if (data.length === 0) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  // Lấy danh sách keys từ object đầu tiên
  const keys = Object.keys(data[0]);

  return (
    <div className={cn("my-6 w-full overflow-y-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            {keys.map((key) => (
              <th
                key={key}
                className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="m-0 border-t p-0 even:bg-muted">
              {keys.map((key) => (
                <td
                  key={key}
                  className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {row[key as keyof T] != null
                    ? row[key as keyof T].toString()
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
