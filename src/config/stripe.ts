export const PLANS = [
    {
        name: 'Free',
        slug: 'free',
        quota: 10,
        pagesPerPDF: 5,
        price: {
            amount: 0,
            priceIds: {
                test: 'PASTE STRIPE ID HERE',
                production: '',
            }
        }
    },
    {
        name: 'Pro',
        slug: 'pro',
        quota: 50,
        pagesPerPDF: 75,
        price: {
            amount: 6.99,
            priceIds: {
                test: 'PASTE STRIPE ID HERE',
                production: '',
            }
        }
    },
]