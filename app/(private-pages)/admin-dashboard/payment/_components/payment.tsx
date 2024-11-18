import { CalendarDateRangePicker } from '@/components/reusables/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import PaymentTable from './payment-table';

export default function PaymentPage() {
  const data = [
    {
      first_name: 'John',
      email: 'mail@mail.com',
      phone: '1234567890',
      plan: 'plan',
      pilgrimage: 'pilgrimage',
      date: 'date',
      status: 'status'
    }
  ];
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <Heading title={`Payment (1)`} description="Manage payments" />
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Separator />
        <PaymentTable data={data} totalData={1} />
      </div>
    </PageContainer>
  );
}
