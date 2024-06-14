'use client';

import { Pencil, Trash2 } from 'lucide-react';

import { formatCurrency, formatDate } from '@/lib/formats';
import { incomeCategory } from '@/components/constant/category';
import { Button } from '@/components/ui/button';
import DataTableColumnHeader from '@/components/table/data-table-column-header';

export const incomecolumns= [
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		cell: (props) => {
			const { row } = props;
			const name = row.getValue('name');
			return <div className="font-medium">{name}</div>;
		},
	},
	{
		accessorKey: 'price',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
		cell: (props) => {
			const {
				row,
				table: { options },
			} = props;
			const user = options.meta?.user;
			const price = parseFloat(row.getValue('price'));
			const formatted = formatCurrency({ value: price, currency: user?.currency, locale: user?.locale });
			return <div className="font-medium tabular-nums">{formatted}</div>;
		},
	},
	{
		accessorKey: 'date',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Received Date" />,
		cell: (props) => {
			const {
				row,
				table: { options },
			} = props;
			const user = options.meta?.user;
			const date = row.getValue('date');
			const formatted = formatDate({ date, locale: user?.locale });
			return <div className="">{formatted}</div>;
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
		cell: ({ row }) => {
			const category = row.getValue('category');
			return <div className="">{incomeCategory[category]}</div>;
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},

	{ accessorKey: 'notes', header: 'Notes' },
	{
		accessorKey: 'actions',
		cell: (props) => {
			const {
				row,
				table: {
					options: { meta },
				},
			} = props;
			return (
				<div className="flex">
					<Button className="mr-1 rounded-lg p-0 hover:bg-transparent hover:opacity-70" variant={'ghost'}>
						<Pencil
							className="h-4 w-4"
							onClick={() => {
								meta?.onEdit(row.original);
							}}
						/>
					</Button>
					<Button className="ml-2 rounded-lg p-0 hover:bg-transparent hover:opacity-70" variant={'ghost'}>
						<Trash2
							className="h-4 w-4"
							onClick={() => {
								meta?.onDelete(row.original?.id);
							}}
						/>
					</Button>
				</div>
			);
		},
		meta: {
			isTogglable: false,
		},
	},
];