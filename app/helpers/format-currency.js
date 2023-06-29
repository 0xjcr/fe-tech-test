import { helper } from '@ember/component/helper';

export default helper(function formatCurrency([number]) {
    if(typeof number !== 'number') {
        return number; // if NaN returns input as-is
    }

    const formattedNumber = number.toFixed(2);
    const currencySymbol = '£';

    return `${currencySymbol}${formattedNumber}`;
})