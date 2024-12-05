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


export const EoyassetColumns = [
  {
    accessorKey: "id",
    header: "S/N",

 cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
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
    accessorKey: "january",
    header: "January",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("january")}</div>
    ),
  },
  {
    accessorKey: "february",
    header: "February",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("february")}</div>
    ),
  },
  {
    accessorKey: "march",
    header: "March",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("march")}</div>
    ),
  },
  {
    accessorKey: "april",
    header: "April",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("april")}</div>
    ),
  },
  {
    accessorKey: "may",
    header: "May",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("may")}</div>
    ),
  },
  {
    accessorKey: "june",
    header: "June",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("june")}</div>
    ),
  },
  {
    accessorKey: "july",
    header: "July",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("july")}</div>
    ),
  },
  {
    accessorKey: "august",
    header: "August",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("august")}</div>
    ),
  },
  {
    accessorKey: "september",
    header: "September",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("september")}</div>
    ),
  },
  {
    accessorKey: "october",
    header: "October",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("october")}</div>
    ),
  },
  {
    accessorKey: "november",
    header: "November",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("november")}</div>
    ),
  },
  {
    accessorKey: "december",
    header: "December",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">{row.getValue("december")}</div>
    ),
  },
  {
    accessorKey: "eoyasset",
    header: "Eoyasset ",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("eoyasset")}</div>
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
    accessorKey: "total_withdrawable",
    header: "total_withdrawable",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("total_withdrawable")}</div>
    ),
  },
]