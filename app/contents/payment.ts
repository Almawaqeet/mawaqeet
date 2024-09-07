import { ReactElement, ReactNode } from "react"


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
    component?: ReactElement
}

export const payment:paymentProps[] = [
    {
        id: 'itm',
        content: [
            {
                id: 'app',
                item: 'Application Form'
            },
            {
                id: 'pay',
                item: 'Payment Info'
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
        content: '1'
    },

    {
        id: '2',
        content: '2'
    },

    {
        id: '3',
        content: '3'
    }
]

export const apptype: AppForm[] = [
    {
        id: '1',
        content: 'Hajj Package'
    },

    {
        id: '2',
        content: 'Umrah Package'
    }
]


export const packtype: AppForm[] = [
    {
      id: '1',
      content: 'Saving Scheme',
     
    },

    {
      id: '2',
      content: 'Upfront Payment',
    }
  ];
  