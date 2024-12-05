import clsx from 'clsx';

export default function InvoiceStatus({status}: {status: string}) {
    return (
        <span className={clsx(
            'inline-flex rounded-full px-2 text-sm',
            {
                'bg-gray-100 text-gray-500': status === 'pending',
                'bg-green-500 text-white': status === 'paid',
            }
        )}
        >{status}</span>
        
    );
}