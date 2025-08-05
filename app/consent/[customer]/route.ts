import  { NextRequest, NextResponse } from 'next/server';

const consentStore = new Map<string, boolean>();

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ customer: string }> }) {
    //console.log('GET request received for consent');
    const {customer} = await params;
    console.log('Customer parameter:', customer);
    const token = request.headers.get('suresteps-session-token');
    console.log('Session token:', token);

    if (!token) {
        return new NextResponse('Missing session token', { status: 401 });
    }

    if (!customer) {
        return new NextResponse('Customer parameter is required', { status: 400 });
    }

    
    const bodyText = await request.text();
    const consentGiven = bodyText.trim().toLowerCase() === 'true';

    
    // Save to in-memory store
    consentStore.set(customer, consentGiven);

    // TODO: Update consent in your database or service here
    console.log(`Updating consent for ${customer}: ${consentGiven} (Token: ${token})`);

    return NextResponse.json({ message: 'Consent updated successfully.' }, { status: 200 });
}


export async function GET(request: NextRequest, { params }: { params: Promise<{ customer: string }> }) {
    const { customer } = await params;
    const token = request.headers.get('suresteps-session-token');

    if (!token) {
        return new NextResponse('Missing session token', { status: 401 });
    }

    const consent = consentStore.get(customer);

    return new NextResponse(String(consent ?? false), {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
    });
}
