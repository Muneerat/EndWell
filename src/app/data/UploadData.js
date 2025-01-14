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


export const UploadColumns = [
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
    accessorKey: "fileName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        File name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("fileName")}</div>,
  },
  {
    accessorKey: "fileType",
    header: "File type",
    cell: ({ row }) => (
      <div className="capitalize flex gap-2"><Excel />{row.getValue("fileType")}</div>
    ),
  },
   {
    accessorKey: "dateUploaded",
    header: "Date Uploaded",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dateUploaded")}</div>
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
    accessorKey: "uploaded_by",
    header: "Uploaded By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("uploaded_by")}</div>
    ),
  },
  {
    accessorKey: "file_link",
    header: "Download file",
    cell: ({ row }) => {
      const fileLink = row.getValue("file_link");
      return (
        <div className="flex items-center gap-2 justify-center">
          <a href={fileLink}>
             <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary hover:text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
              />
            </svg>
          </a>
        </div>
      )
      // <div className="capitalize">{row.getValue("file_link")}</div>
    },
  },
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
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
