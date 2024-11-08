"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "../../../../components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
// import { Input } from "./../../../components/ui/input"
import {Input} from "../../../../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table"
import { Checkbox } from "@radix-ui/react-checkbox"

const data = [
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
  // {
  //   id: "6",
  //   name: "ODEBODE I.A",
  //   number: '0706924568',
  //   asset: "776,350",
  //   dividend: "194,087.5",
  //   withdrawable: "145,565.625"
  // },

]

// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

// export const columns = [
//   {
//     accessorKey: "id",
//     header: "S/N",

//  cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("id")}</div>
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//     {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//          Members name
//           <CaretSortIcon className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "number",
//     header: "Phone number",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("number")}</div>
//     ),
//   },
//    {
//     accessorKey: "asset",
//     header: "Total Asset(NGN)",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("asset")}</div>
//     ),
//   },
//    {
//     accessorKey: "dividend",
//     header: "Total Dividend(NGN)",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("dividend")}</div>
//     ),
//   },
//   {
//     accessorKey: "withdrawable",
//     header: "Withdrawable Dividend(NGN)",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("withdrawable")}</div>
//     ),
//   },

//   // {
//   //   accessorKey: "amount",
//   //   header: () => <div className="text-right">Amount</div>,
//   //   cell: ({ row }) => {
//   //     const amount = parseFloat(row.getValue("amount"))

//   //     // Format the amount as a dollar amount
//   //     const formatted = new Intl.NumberFormat("en-US", {
//   //       style: "currency",
//   //       currency: "USD",
//   //     }).format(amount)

//   //     return <div className="text-right font-medium">{formatted}</div>
//   //   },
//   // },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const payment = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0  ">
//               <span className="sr-only">Open menu</span>
//               <DotsHorizontalIcon className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="bg-white">
//             {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
//             {/* <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem> */}
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Delete</DropdownMenuItem>
//             <DropdownMenuItem>View</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

export function DataTable({data, columns}) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w- m-6">
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() ) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <div className="rounded-md border bg-white
      ">
        <Table className="">
          <TableHeader className="bg-primary text-white ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow  key={headerGroup.id} >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="py-5 px-" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                 
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}  className="px-4 py-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
   <div className=" mt-6 bg-red-">
   <Pagination className="flex justify-end  items-end  ">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
   </div>
    </div>
  )
}
