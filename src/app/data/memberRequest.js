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


export const memberRequestsColumns = [
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
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("month")}</div>
    ),
  },
   {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "request_date",
    header: "Request Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("request_date")}</div>
    ),
  },
  {
    accessorKey: "request_type",
    header: "Request Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("request_type")}</div>
    ),
  },
   {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("year")}</div>
    ),
  },
]
