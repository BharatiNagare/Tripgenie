import { CURRENCIES } from '../data/sampleDestinations';

export function formatCurrency(amount: number, targetCurrency = 'INR', baseCurrency = 'USD'): string {
  const targetInfo = CURRENCIES.find((c) => c.code === targetCurrency) || CURRENCIES[0];
  const baseInfo = CURRENCIES.find((c) => c.code === baseCurrency) || CURRENCIES[0];

  // Convert amount to USD first, then to target
  const amountInUSD = amount / (baseInfo.rateToUSD || 1);
  const convertedAmount = amountInUSD * (targetInfo.rateToUSD || 1);

  const locale = targetInfo.code === 'INR' ? 'en-IN' : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: targetInfo.code,
    maximumFractionDigits: 0,
  }).format(convertedAmount);
}

export function convertAmount(amount: number, targetCurrency = 'INR', baseCurrency = 'USD'): number {
  const targetInfo = CURRENCIES.find((c) => c.code === targetCurrency) || CURRENCIES[0];
  const baseInfo = CURRENCIES.find((c) => c.code === baseCurrency) || CURRENCIES[0];

  const amountInUSD = amount / (baseInfo.rateToUSD || 1);
  return Math.round(amountInUSD * (targetInfo.rateToUSD || 1));
}

