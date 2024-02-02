import { PLANS } from "@/config/stripe";

export const welcomeParagraph: string = 'IntelliText allows you to have conversations with any PDF document. ' +
    'Simply upload your file and start asking questions right away'

export const pricingItemsList = [
    {
        plan: 'Free',
        tagline: 'For small side projects.',
        quota: 10,
        features: [
            {
                text: '5 pages per PDF',
                footnote: 'The maximum amount of pages per PDF-file.',
                negative: false,
            },
            {
                text: '4MB file size limit',
                footnote: 'The maximum file size of a single PDF file.',
                negative: false,
            },
            {
                text: 'Mobile-friendly interface',
                negative: false,
            },
            {
                text: 'Higher-quality responses',
                footnote: 'Better algorithmic responses for enhanced content quality',
                negative: true,
            },
            {
                text: 'Priority support',
                negative: true,
            },
        ],
    },
    {
        plan: 'Pro',
        tagline: 'For larger projects with higher needs.',
        quota: PLANS.find((p) => p.slug === 'pro')!.quota,
        features: [
            {
                text: '75 pages per PDF',
                footnote: 'The maximum amount of pages per PDF-file.',
                negative: false,
            },
            {
                text: '32MB file size limit',
                footnote: 'The maximum file size of a single PDF file.',
                negative: false,
            },
            {
                text: 'Mobile-friendly interface',
                negative: false,
            },
            {
                text: 'Higher-quality responses',
                footnote: 'Better algorithmic responses for enhanced content quality',
                negative: false,
            },
            {
                text: 'Priority support',
                negative: false,
            },
        ],
    },
    {
        plan: 'Intelli',
        tagline: 'Get maximum of our AI resources.',
        quota: PLANS.find((p) => p.slug === 'intelli')!.quota,
        features: [
            {
                text: 'Unlimited pages per PDF',
                footnote: 'The maximum amount of pages per PDF-file.',
                negative: false,
            },
            {
                text: '200MB file size limit',
                footnote: 'The maximum file size of a single PDF file.',
                negative: false,
            },
            {
                text: 'Mobile-friendly interface',
                negative: false,
            },
            {
                text: 'Higher-quality responses',
                footnote: 'Better algorithmic responses for enhanced content quality',
                negative: false,
            },
            {
                text: 'Priority support',
                negative: false,
            },
        ],
    },
]