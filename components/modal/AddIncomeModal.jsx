'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '../providers/auth-provider';
import { format } from 'date-fns';
import debounce from 'debounce';
import { toast } from 'sonner';
import { addIncome, editIncome } from '@/app/v1/income/apis';
import messages from '../constant/messages';
import { dateFormat, datePattern } from '../constant/date-time';
import { incomeCategory } from '../constant/category';
import { getCurrencySymbol } from '@/lib/formats';
import BaseModal from './BaseModal';
import CircleLoader from '../loader/CircleLoader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { incrementUsage } from '@/app/v1/apis';


// import AutoCompleteList from 'components/autocomplete-list';


const initialState = {
	category: '',
	date: '',
	name: '',
	notes: '',
	price: '',
	autocomplete: [],
};

export default function AddIncomeModal({ show, onHide, mutate, selected, lookup }) {
	const user = useUser();
	const todayDate = format(new Date(), dateFormat);
	const [state, setState] = useState({ ...initialState, date: todayDate });
	const [loading, setLoading] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => setState(selected.id ? selected : { ...initialState, date: todayDate }), [selected, todayDate]);

	const onLookup = useMemo(() => {
		const callbackHandler = (value) => {
			setState((prev) => ({ ...prev, autocomplete: lookup(value) }));
		};
		return debounce(callbackHandler, 500);
	}, [lookup]);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const isEditing = selected?.id;
			if (isEditing) {
				await editIncome(state);
			} else {
				await addIncome(state);
				incrementUsage();
			}
			setLoading(false);
			toast.success(isEditing ? messages.updated : messages.success);
			if (mutate) mutate();
			onHide();
			setState({ ...initialState });
		} catch {
			setLoading(false);
			toast.error(messages.error);
		}
	};

	return (
		<BaseModal someRef={inputRef} show={show} title={`${selected.id ? 'Edit' : 'Add'} Income`} onHide={onHide}>
			<div className="sm:flex sm:items-start max-sm:pb-6">
				<form
					className="md:[420px] grid w-full grid-cols-1 items-center gap-3"
					onSubmit={(event) => {
						event.preventDefault();
						handleSubmit();
						if (!selected.id) setState({ ...initialState });
					}}
				>
					<div className="relative">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							className="mt-1.5 h-8 dark:bg-[#09090a]"
							placeholder="Salary"
							maxLength={30}
							required
							ref={inputRef}
							autoFocus
							autoComplete="off"
							onChange={({ target }) => {
								const { value } = target;
								if (value.length) {
									setState({ ...state, name: value, autocomplete: [] });
									if (value.length > 2) onLookup(value);
								} else {
									setState({ ...state, name: '', category: '', autocomplete: [] });
								}
							}}
							value={state.name}
						/>
						{/* <AutoCompleteList
							onHide={() => {
								setState({ ...state, autocomplete: [] });
							}}
							data={state.autocomplete}
							searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ''}
							onClick={({ name, category }) => {
								setState({ ...state, name, category, autocomplete: [] });
							}}
							show={Boolean(state.autocomplete?.length)}
						/> */}
					</div>
					<div className="grid grid-cols-[32%,38%,30%] gap-1">
						<div className="mr-3">
							<Label htmlFor="amount">
								Amount
								<span className="ml-2 font-mono text-xs text-muted-foreground">
									({getCurrencySymbol(user.currency, user.locale)})
								</span>
							</Label>
							<Input
								className="mt-1.5 h-8 dark:bg-[#09090a]"
								id="amount"
								type="number"
								inputMode="decimal"
								placeholder="10000"
								required
								min="0"
								step="any"
								onChange={(event) => setState({ ...state, price: event.target.value })}
								value={state.price}
							/>
						</div>
						<div className="mr-3">
							<Label htmlFor="date">Received Date</Label>
							<Input
								className="mt-1.5 appearance-none h-8 dark:bg-[#09090a]"
								id="date"
								type="date"
								required
								max={todayDate}
								pattern={datePattern}
								onChange={(event) => {
									setState({ ...state, date: event.target.value });
								}}
								value={state.date}
							/>
						</div>
						<div className="mr-3">
							<Label htmlFor="category">Category</Label>
							<select
								id="category"
								className="mt-1.5 flex dark:bg-[#09090a] h-8 max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								onChange={(event) => {
									setState({ ...state, category: event.target.value });
								}}
								value={state.category}
								required
							>
								{Object.keys(incomeCategory).map((categoryKey) => {
									return (
										<option key={categoryKey} value={categoryKey}>
											{incomeCategory[categoryKey]}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div>
						<Label className="block">
							Notes <span className="text-center text-sm text-muted-foreground">(optional)</span>
						</Label>
						<Textarea
							className="mt-2 h-20 dark:bg-[#09090a]"
							onChange={(event) => setState({ ...state, notes: event.target.value })}
							value={state.notes}
							maxLength={60}
						/>
					</div>

					<Button disabled={loading} className="mt-1.5" type="submit">
						{loading ? <CircleLoader /> : `${selected?.id ? 'Update' : 'Submit'}`}
					</Button>
				</form>
			</div>
		</BaseModal>
	);
}