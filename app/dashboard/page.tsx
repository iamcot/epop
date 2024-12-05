import { fetchData } from "@/app/lib/data";
import Cards from "@/app/ui/dashboard/cards";

export default async function Page() {
    const [customers, invoices] = await fetchData();
    return (
        <>
            <h1 className="pb-2">Dashboard</h1>
            <div className="grid gap-6 lg:grid-cols-4">
                <Cards title="Total Invoice" value={invoices.length} type="open"/>
            </div>
        </>
    );
}