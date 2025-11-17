import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const player = await prisma.player.create({
      data: {
        name: body.name,
        position: body.position,
        overall: body.overall,
        nationality: body.nationality,
        club: body.club,
        age: body.age,
        height: body.height,
        weight: body.weight,
        description: body.description || '',
      },
    });
    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    );
  }
}

