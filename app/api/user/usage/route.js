import messages from '@/components/constant/messages';
import { checkAuthorisation } from '@/lib/authorisation';
import prismaClient from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function POST(request) {
	return await checkAuthorisation(async (user) => {
		try {
			await prismaClient.users.update({ data: { usage: { increment: 1 } }, where: { id: user.id } });
			return NextResponse.json('Done');
		} catch (error) {
			return NextResponse.json({ message: String(error) || messages.error }, { status: 500 });
		}
	});
}