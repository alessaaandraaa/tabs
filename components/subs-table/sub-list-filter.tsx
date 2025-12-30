import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const TYPE_OPTIONS = ["streaming", "gaming", "edu", "util", "other"];

interface FilterProps<TData> {
  table: Table<TData>;
}

export function TypeFilter({ table }: FilterProps<any>) {
  const column = table.getColumn("type");
  const selectedValues = (column?.getFilterValue() as string[]) || [];

  const handleSelect = (checked: boolean, value: string) => {
    if (checked) {
      column?.setFilterValue([...selectedValues, value]);
    } else {
      column?.setFilterValue(selectedValues.filter((item) => item !== value));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-xs mb-2 cursor select-none">
          Filter Type
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {TYPE_OPTIONS.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedValues.includes(option)}
            onCheckedChange={(checked) => handleSelect(checked, option)}
            onSelect={(e) => e.preventDefault()}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}

        {selectedValues.length > 0 && (
          <DropdownMenuCheckboxItem
            className="justify-center font-bold text-red-500"
            onCheckedChange={() => column?.setFilterValue(undefined)}
          >
            Clear Filters
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
