'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import useSWR from 'swr';
import { getApiUrl, views } from '@/components/constant/urls';

const DataContext = createContext(null);


export const DataContextProvider = (props) => {
	const { children, name, isNotRange = false } = props;
	const [filter, setFilter] = useState(views.thisMonth.key);
	const [categories, setCategories] = useState([]);

	const { data = [], mutate, isLoading } = useSWR(getApiUrl(filter, name, categories, isNotRange));

	const onFilter = useCallback((categories) => {
		setCategories(categories);
	}, []);

	const value = useMemo(
		() => ({ data, loading: isLoading, filter: { name: filter, setFilter, onFilter }, mutate }),
		[data, isLoading, filter, mutate, onFilter]
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error(`useData must be used within a DataContext.`);
	}
	return context;
};