import { Excel } from "@/assets/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

export const SmsCountColumns = [
    {
        accessorKey: "ID",
        header: "S/N",
    
     cell: ({ row }) => (
          <div className="capitalize">{row.getValue("ID")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
  {
    accessorKey: "member_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Member name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("member_name")}</div>
    ),
  },
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("month")}</div>
    ),
  },
 
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => <div className="capitalize">{row.getValue("year")}</div>,
  },
  {
    accessorKey: "no_of_message",
    header: "No of message ",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("no_of_message")}</div>
    ),
  },
  {
    accessorKey: "no_of_unit_used",
    header: "Number of unit used",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("no_of_unit_used")}</div>
    ),
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("total_amount")}</div>
    ),
  },
];
