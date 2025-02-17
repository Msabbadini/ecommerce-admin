"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@radix-ui/react-separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboarColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiLIst } from "@/components/ui/api-list"

interface BillboardClientProps {
    data: BillboarColumns[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={` Billboards (${data.length})`}
                    description="Manage billboards for your store"
                />
                <Button onClick={() => router.push(`/${params.storeid}/billboards/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />
            <Heading title="API" description="API calls for Billboards" />
            <Separator />
            <ApiLIst entityName="billboards" entityIdName="billboardsId" />
        </>
    )
}