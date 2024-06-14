'use client';

import { DropdownMenuRadioGroup, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { views } from '@/components/constant/urls';

export default function DataTableFilterOptions({
	filter,
	setFilter,
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 max-sm:h-10 text-sm capitalize max-sm:px-1 lg:flex dark:bg-[#09090a]">
					<Filter className="mr-1.5 h-3 w-3 sm:inline-block" />
					{views[filter].name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px] dark:bg-[#09090a]">
				<DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
					{Object.keys(views).map((key) => {
						return (
							<DropdownMenuRadioItem key={views[key].key} value={views[key].key}>
								{views[key].name}
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}