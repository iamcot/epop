import Search from "@/app/ui/invoices/search";
import InvoiceTable from "@/app/ui/invoices/table";
import InvoiceTableSkeleton from "@/app/ui/invoices/table-skeleton";
import { Suspense } from "react";
import 'react-loading-skeleton/dist/skeleton.css'

export default function Page({searchParams,}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <>
            <h1>Invoice Page</h1>
            <div className="mt-4 flex item-center">
                <Search placeholder="Search invoices..." />
            </div>
            <div>
                <p>Query: {query}</p>
                <p>Page: {currentPage}</p>
                <Suspense key={query + currentPage} fallback={<InvoiceTableSkeleton />}>
                    <InvoiceTable />
                </Suspense>
            </div>
        </>
    );
}