import Skeleton from "react-loading-skeleton";

export default function InvoiceTable() {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td><span>{<Skeleton />}</span></td>
                        <td><span>{<Skeleton />}</span></td>
                        <td><span>{<Skeleton />}</span></td>
                    </tr>
                    <tr>
                        <td><span>{<Skeleton />}</span></td>
                        <td><span>{<Skeleton />}</span></td>
                        <td><span>{<Skeleton />}</span></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}