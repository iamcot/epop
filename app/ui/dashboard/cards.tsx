import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function Cards({ title, value, type }: { title: string, value: number, type: "open" | "hide" }) {
    return (
        <>
            <div className="border p-2">
                <>{title || <Skeleton />}</>
                <>{<Skeleton count={2} /> }</>
            </div>
        </>
    );
}