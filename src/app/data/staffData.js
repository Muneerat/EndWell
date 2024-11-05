
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

export const StaffData = [
    {
        id: "1",
        name: "ODEBODE I.A",
        number: '0706924568',
        asset: "776,350",
        dividend: "194,087.5",
        withdrawable: "145,565.625"
      },
      {
        id: "2",
        name: "ODEBODE I.A ",
        number: '0706924568',
        asset: "776,350",
        dividend: "194,087.5",
        withdrawable: "145,565.625"
      },
      {
        id: "3",
        name: "ODEBODE I.A",
        number: '0706924568',
        asset: "776,350",
        dividend: "194,087.5",
        withdrawable: "145,565.625"
      },
      {
        id: "4",
        name: "ODEBODE I.A ",
        number: '0706924568',
        asset: "776,350",
        dividend: "194,087.5",
        withdrawable: "145,565.625"
      },
      {
        id: "5",
        name: "ODEBODE I.A",
        number: '0706924568',
        asset: "776,350",
        dividend: "194,087.5",
        withdrawable: "145,565.625"
      },
]
export const StaffColumns = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Members name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "number",
    header: "Phone number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("number")}</div>
    ),
  },
   {
    accessorKey: "asset",
    header: "Total Asset(NGN)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("asset")}</div>
    ),
  },
   {
    accessorKey: "dividend",
    header: "Total Dividend(NGN)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dividend")}</div>
    ),
  },
  {
    accessorKey: "withdrawable",
    header: "Withdrawable Dividend(NGN)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("withdrawable")}</div>
    ),
  },

  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0  ">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
