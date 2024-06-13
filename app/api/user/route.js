import { NextResponse } from 'next/server';

import { addYears } from 'date-fns';
import { checkAuthorisation } from '@/lib/authorisation';
import prismaClient from '@/lib/prisma';

export async function GET() {
	return await checkAuthorisation(async (user) => {
		try {
			const data = await prismaClient.users.findUnique({
				where: { id: user.id },
				select: {
					currency: true,
					locale: true,
					billing_start_date: true,
					trial_start_date: true,
					order_status: true,
					usage: true,
					email: true,
					plan_status: true,
				},
			});
			const isPremiumPlan = data?.order_status === 'paid' && data?.plan_status === 'premium';
			const isPremiumPlanEnded =
				isPremiumPlan && data?.billing_start_date && new Date() > addYears(new Date(data.billing_start_date), 1);
			const isPremium = isPremiumPlan && !isPremiumPlanEnded;

			return NextResponse.json({ ...data, isPremium, isPremiumPlanEnded }, { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}

// export async function PATCH(request: NextRequest) {
// 	const { currency, locale } = await request.json();
// 	return await checkAuth(async (user: any) => {
// 		try {
// 			await prisma.users.update({ data: { currency, locale }, where: { id: user.id } });
// 			return NextResponse.json('Updated');
// 		} catch (error) {
// 			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
// 		}
// 	});
// }

// export async function POST(request) {
// 	return await checkAuth(async (user) => {
// 		try {
// 			const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
// 			if (error) {
// 				return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
// 			}
// 			await prisma.users.delete({ where: { id: user.id } });
// 			try {
// 				await resend.emails.send({
// 					from: emails.from,
// 					subject: emails.account.deleted,
// 					to: user.email,
// 					react: AccountedDeleteEmail(),
// 				});
// 			} catch (error) {
// 				throw error;
// 			}
// 			return NextResponse.json('Deleted');
// 		} catch (error) {
// 			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
// 		}
// 	});
// }