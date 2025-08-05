import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

/*type AccessRequest = {
  clinicianUsername: string;
  customerEmail: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'denied';
};*/

//let accessRequests: AccessRequest[] = [];

export async function POST(req: NextRequest) {
  const token = req.headers.get('suresteps-session-token');
  if (!token) {
    return new NextResponse('Unauthorized: Missing token', { status: 401 });
  }

  const { clinicianUsername, customerEmail } = await req.json();

  if (!clinicianUsername || !customerEmail) {
    return new NextResponse('Bad Request: Missing required fields', { status: 400 });
  }

  await prisma.clinicianAccessRequest.create({
    data: { clinicianUsername, customerEmail },
  });

  /*const newRequest: AccessRequest = {
    clinicianUsername,
    customerEmail,
    requestDate: new Date().toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }),
    status: 'pending',
  };*/

  //accessRequests.push(newRequest);
  return new NextResponse('Access request submitted successfully.', { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get('suresteps-session-token');
  if (!token) {
    return new NextResponse('Unauthorized: Missing token', { status: 401 });
  }

  const { clinicianUsername, customerEmail } = await req.json();
  
  if (!clinicianUsername || !customerEmail) {
    return new NextResponse('Bad Request: Missing required fields', { status: 400 });
  }

  const deleted = await prisma.clinicianAccessRequest.deleteMany({
    where: { clinicianUsername, customerEmail },
  });

  if (deleted.count === 0) {
    return new NextResponse('Access request not found', { status: 404 });
  }
  /*const index = accessRequests.findIndex(
    (req) =>
      req.clinicianUsername === clinicianUsername &&
      req.customerEmail === customerEmail
  );

  if (index === -1) {
    return new NextResponse('Access request not found', { status: 404 });
  }

  accessRequests.splice(index, 1);*/
  return new NextResponse('Access request deleted successfully.', { status: 200 });
}

//export { accessRequests }; // Export for use in other routes
