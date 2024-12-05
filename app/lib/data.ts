const customers = [
    {
        id: 1,
        name: "CoT",
    },
    {
        id: 2,
        name: "Pepsi",
    }
];

const mock_invoices = [
    {
        customer_id: customers[0].id,
        amount: 100000,
        status: 'pending',
        data: '2024-08-30',
    },
    {
        customer_id: customers[1].id,
        amount: 999000,
        status: 'paid',
        data: '2024-08-29',
    }
];


export async function fetchData() {
    try {
        const data = await Promise.all(
            [
                customers,
                mock_invoices,
            ]);
     
        return data;
    } catch (error) {
        throw new Error('failed');
    }

}

