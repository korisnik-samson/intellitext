export const PLANS = [
    {
        name: 'Free',
        slug: 'free',
        quota: 10,
        pagesPerPDF: 5,
        price: {
            amount: 0,
            priceIds: {
                test: '',
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
            amount: 4.99,
            priceIds: {
                test: 'price_1Oe2NtCz9pMpobCp6A2GXyWk',
                production: 'price_1Oe27CCz9pMpobCpR2AoMrGp',
            }
        }
    },
    {
        name: 'Intelli',
        slug: 'intelli',
        quota: 'Unlimited',
        pagesPerPDF: 'Unlimited',
        price: {
            amount: 7.49,
            priceIds: {
                test: 'price_1Oe2S5Cz9pMpobCpwTSsLlcQ',
                production: 'price_1Oe2oTCz9pMpobCppjn58wS8',
            }
        }
    },
]