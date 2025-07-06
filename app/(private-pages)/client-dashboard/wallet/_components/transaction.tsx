'use client';

import { WalletTransactionResponse } from '@/network/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';

interface TransactionProps {
  transaction: WalletTransactionResponse;
}

export function Transaction({ transaction }: TransactionProps) {
  const isCredit = transaction?.transaction_type?.toLowerCase() === 'credit';

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-full ${isCredit ? 'bg-green-100' : 'bg-red-100'}`}
          >
            {isCredit ? (
              <ArrowDownLeft className="h-5 w-5 text-green-600" />
            ) : (
              <ArrowUpRight className="h-5 w-5 text-red-600" />
            )}
          </div>

          <div>
            <p className="font-medium text-gray-900">
              {transaction?.reason ?? 'Transaction'}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              {transaction?.transaction_date
                ? format(
                    new Date(transaction.transaction_date),
                    'MMM d, yyyy • h:mm a'
                  )
                : 'Date not available'}
            </div>
            {transaction?.reference && (
              <p className="text-sm text-gray-500 mt-1">
                Ref: {transaction.reference}
              </p>
            )}
          </div>
        </div>

        <div className="text-right">
          <p
            className={`font-semibold ${isCredit ? 'text-green-600' : 'text-red-600'}`}
          >
            {isCredit ? '+' : '-'}₦
            {transaction?.amount
              ? Number(transaction.amount).toLocaleString('en-NG', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : '0.00'}
          </p>
          <Badge
            variant="outline"
            className={`
              ${
                transaction?.status?.toLowerCase() === 'completed'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-yellow-50 text-yellow-700 border-yellow-200'
              }
            `}
          >
            {transaction?.status ?? 'Pending'}
          </Badge>
        </div>
      </div>

      {(transaction?.bank || transaction?.account_number) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {transaction?.bank && (
              <span className="mr-3">{transaction.bank}</span>
            )}
            {transaction?.account_number && (
              <span>•••• {transaction.account_number.slice(-4)}</span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
