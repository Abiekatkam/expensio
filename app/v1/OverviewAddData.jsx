'use client';

import Add from '@/components/common/AddButton';
import { useOverview } from '@/components/providers/overview-provider';
import { lookup } from '@/lib/lookup';
import { useCallback } from 'react';

const OverviewAddData = () => {
	const { data } = useOverview();
	const { mutateExpenses } = data.mutate;
	const onLookupExpenses = useCallback((name) => lookup({ data: data.expenses, name }), [data]);
	return <Add type="expenses" mutate={mutateExpenses} onLookup={onLookupExpenses} />;
};

export default OverviewAddData;