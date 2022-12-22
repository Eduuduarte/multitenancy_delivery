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
    },
    formatDate: (date: string) => {
        let currentDate = new Date(`${date} 00:00:00`);

        return new Intl.DateTimeFormat('pt-BR').format(currentDate);
    }
});