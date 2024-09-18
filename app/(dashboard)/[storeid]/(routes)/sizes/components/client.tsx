"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@radix-ui/react-separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { columns, SizeColumns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiLIst } from "@/components/ui/api-list"

interface SizeClientProps {
    data: SizeColumns[]
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={` Sizes (${data.length})`}
                    description="Manage sizes for your store"
                />
                <Button onClick={() => router.push(`/${params.storeid}/sizes/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Sizes" />
            <Separator />
            <ApiLIst entityName="sizes" entityIdName="sizeId" />
        </>
    )
}