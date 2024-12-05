export type Invoice = {
    id: number;
    customer_id: number;
    amount: number;
    status: 'pending' | 'paid';
}