'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from '@/components/ui/dropdown-menu';

export default function DataTableViewOptions({ table }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 max-sm:h-10 text-sm capitalize max-sm:px-1 lg:flex dark:bg-[#09090a]">
					<MixerHorizontalIcon className="mr-1.5 h-4 w-4 sm:inline-block" />
					Columns
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px] dark:bg-[#09090a]">
				{table
					.getAllColumns()
					.filter((column) => {
						return (
							typeof column.accessorFn !== 'undefined' &&
							column.getCanHide() &&
							column.columnDef.meta?.isTogglable !== false
						);
					})
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.id.replace(/_/g, ' ')}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}