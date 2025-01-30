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
} from "@/components/ui/dropdown-menu"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"


export const UserTransactionColumns = [
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
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("member_name")}</div>,
  },
  {
    accessorKey: "total_contribution",
    header: "Total Contribution",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("total_contribution")}</div>
    ),
  },
   {
    accessorKey: "total_dividend",
    header: "Total Dividend",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("total_dividend")}</div>
    ),
  },
   {
    accessorKey: "withdrawable_dividend",
    header: "Withdrawable Dividend",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("withdrawable_dividend")}</div>
    ),
  },
  {
    accessorKey: "month",
    header: "Month ",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("month")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: "Year ",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("year")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date ",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "uploaded_by",
    header: "Uploaded By ",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("uploaded_by")}</div>
    ),
  },
 
]