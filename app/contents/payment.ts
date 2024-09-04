type Content = {
    id: string,
    item: string
}

type paymentProps = {
    id: string,
    content: Content[]
}

type paymentDetailsProps = {
    id: string,
    content: string
}

type AppForm = {
    id: string,
    content: string
}

export const payment:paymentProps[] = [
    {
        id: 'itm',
        content: [
            {
                id: 'pay',
                item: 'Payment Info'
            },
            {
                id: 'app',
                item: 'Application Form'
            }
        ]
    }
]

export const paymentDetails:paymentDetailsProps[] = [
{
    id: 'copy',
    content: 'Copy Account Details'
},

{
    id: 'bank',
    content: 'Access Bank Plc'
},

{
    id: 'acc-num',
    content: '0273579867'
},

{
    id: 'acc-name',
    content: 'Abdulkareem Hamzat'
},

{
    id: 'copyicon',
    content: 'Copy Details'
},
]

export const appForm: AppForm[] = [
    {
        id: '1',
        content: 'Step 1'
    },

    {
        id: '2',
        content: 'Step 2'
    },

    {
        id: '3',
        content: 'Step 3'
    }
] 