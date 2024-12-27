import { ReactElement, ReactNode } from 'react';

type Content = {
  id: number;
  item: string;
};

type paymentProps = {
  id: number;
  content: Content[];
};

type paymentDetailsProps = {
  id: string;
  content: string;
};

type AppForm = {
  id: number;
  content: string;
};

export const payment: paymentProps[] = [
  {
    id: 0,
    content: [
      {
        id: 1,
        item: 'Application Form',
      },
      {
        id: 2,
        item: 'Payment Info',
      },
    ],
  },
];

export const steps: paymentProps[] = [
  {
    id: 0,
    content: [
      {
        id: 1,
        item: 'Step 1:  Fill all personal details',
      },

      {
        id: 2,
        item: 'Step 2:  Select Package',
      },

      {
        id: 3,
        item: 'Step 3:  Next of Kin details',
      },
    ],
  },
];

export const paymentDetails: paymentDetailsProps[] = [
  {
    id: 'copy',
    content: 'Copy Account Details',
  },

  {
    id: 'bank',
    content: 'Access Bank Plc',
  },

  {
    id: 'acc-num',
    content: '0273579867',
  },

  {
    id: 'acc-name',
    content: 'Abdulkareem Hamzat',
  },

  {
    id: 'copyicon',
    content: 'Copy Details',
  },
];

export const appForm: AppForm[] = [
  {
    id: 1,
    content: 'step1',
  },

  {
    id: 2,
    content: 'step2',
  },

  {
    id: 3,
    content: 'step3',
  },
];

export const apptype: AppForm[] = [
  {
    id: 1,
    content: 'Hajj Package',
  },

  {
    id: 1,
    content: 'Umrah Package',
  },
];

export const packtype: AppForm[] = [
  {
    id: 1,
    content: 'Saving Scheme',
  },

  {
    id: 1,
    content: 'Upfront Payment',
  },
];
