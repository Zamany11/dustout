import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {

    // Fetch the most recent booking without assigned staff
    const upcomingBooking = await prisma.booking.findFirst({
      where: {
        staffId: null, // No staff assigned
      },
      orderBy: {
        createdAt: 'asc', // Earliest booking first
      },
      include: {
        user: true,
        staff: true,
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    if (!upcomingBooking) {
      return NextResponse.json({ message: 'No unassigned bookings found' }, { status: 404 });
    }

    // Format the booking data for the frontend
    const formattedBooking = {
      id: upcomingBooking.id,
      clientName: upcomingBooking.fullName || 'Unknown Client',
      service: upcomingBooking.services.length > 0 
        ? upcomingBooking.services.map(s => s.service.name).join(', ')
        : 'No services',
      date: upcomingBooking.preferredDate ? upcomingBooking.preferredDate.toISOString().split('T')[0] : 'Date not specified',
      time: upcomingBooking.preferredTime || 'Time not specified',
      staff: upcomingBooking.staff ? `${upcomingBooking.staff.firstName} ${upcomingBooking.staff.lastName}` : 'Not Assigned',
      address: upcomingBooking.address || 'Address not provided',
    };

    return NextResponse.json(formattedBooking);
  } catch (error) {
    console.error('Error fetching upcoming booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}