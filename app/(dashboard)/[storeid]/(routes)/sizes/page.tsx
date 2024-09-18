import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { SizeClient } from "./components/client";
import { SizeColumns } from "./components/columns";

// interface SizesPageProps { }
const SizesPage = async ({
    params
}: {
    params: { storeid: string }
}) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeid
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedSizes: SizeColumns[] = sizes.map((size) => ({
        id: size.id,
        name: size.name,
        value: size.value,
        createdAt: format(size.createdAt, "MMMM do, yyyy")
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    )
}
export default SizesPage;