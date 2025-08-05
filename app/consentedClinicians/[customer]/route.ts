import { NextRequest } from 'next/server';

type ClinicianEntry = {
  clinician: string;
  expires: string;
};

// In-memory store (replace with DB in production)
const db: Record<string, ClinicianEntry[]> = {};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ customer: string }> }) {
  const token = req.headers.get('suresteps-session-token');
  const {customer} = await params;

  if (!token) {
    return new Response('Missing session token.', { status: 401 });
  }

  const clinicianEmail = await req.text();
  if (!clinicianEmail || !clinicianEmail.includes('@')) {
    return new Response('Invalid clinician email.', { status: 400 });
  }

  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);

  if (!db[customer]) {
    db[customer] = [];
  }

  // Avoid duplicates
  const alreadyExists = db[customer].some(entry => entry.clinician === clinicianEmail);
  if (!alreadyExists) {
    db[customer].push({
      clinician: clinicianEmail,
      expires: expirationDate.toISOString(),
    });
  }

  return new Response('Clinician consent updated successfully.', { status: 200 });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ customer: string }> }) {
  const token = req.headers.get('suresteps-session-token');
  const {customer} = await params;

  if (!token) {
    return new Response('Missing session token.', { status: 401 });
  }

  const clinicians = db[customer]?.map(entry => entry.clinician) || [];
  return Response.json(clinicians);
}
