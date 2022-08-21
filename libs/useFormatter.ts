export const useFormatter = () => ({
    formtPrice: (price: number) => {
        return price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        })
    },
    formatQuantity: (qt: number, mindigits: number) => {
        if(qt.toString().length >= mindigits) return qt.toString();

        const remain = mindigits - qt.toString().length;
        return `${'0'.repeat(remain)}${qt}`;
    }
});