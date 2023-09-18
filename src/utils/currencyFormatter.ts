const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'INR',
    style: 'currency',
})

export const currencyFormatter = (currency: number) => CURRENCY_FORMATTER.format(currency)