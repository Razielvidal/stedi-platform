import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';



export async function GET(req: NextRequest, { params }: { params: Promise<{ customer: string }> }) {
  const token = req.headers.get('suresteps-session-token');
  if (!token) {
    return new NextResponse('Unauthorized: Missing token', { status: 401 });
  }

  const {customer} = await params;

  if (!customer) {
    return new NextResponse('Bad Request: Missing customer identifier', { status: 400 });
  }
  const customerEmail = decodeURIComponent(customer);

  const requests = await prisma.clinicianAccessRequest.findMany({
    where: { customerEmail },
    orderBy: { requestDate: 'desc' },
  });

  const formatted = requests.map((r) => ({
    clinicianUsername: r.clinicianUsername,
    customerEmail: r.customerEmail,
    requestDate: r.requestDate.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }),
    status: r.status,
  }));
  /*const requests = accessRequests.filter(
    (req) => req.customerEmail.toLowerCase() === customerEmail.toLowerCase()
  );*/

  return NextResponse.json(formatted, { status: 200 });
}
