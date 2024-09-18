"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@radix-ui/react-separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiLIst } from "@/components/ui/api-list"

interface CategoryClientProps {
    data: CategoryColumns[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={` Categories (${data.length})`}
                    description="Manage categories for your store"
                />
                <Button onClick={() => router.push(`/${params.storeid}/categories/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for categories" />
            <Separator />
            <ApiLIst entityName="categories" entityIdName="categoryId" />
        </>
    )
}