
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    {
        name: "dashboard",
        href: "/dashboard",
        title: "Dashboard"
    },
    {
        name: "customers",
        href: "/dashboard/customers",
        title: "Customers"
    },
    {
        name: "invoices",
        href: "/dashboard/invoices",
        title: "Invoices"
    },
];
export default function NavLinks() {
    const pathname = usePathname();
    return (
        <ul className='p-5'>
            {links.map((link) => {
                return (
                    <li key={link.name}>
                        <Link key={link.name} href={link.href} 
                        className={clsx(
                            'flex hover:bg-sky-100 p-2',
                            {
                                'bg-sky-100 text-blue-500': pathname === link.href,
                            }
                        )}
                        >{link.title}</Link>
                    </li>
                );
            })}
        </ul>
    );
}