import { Skeleton } from '@mui/material';

export function Form() {
	return (
		<div aria-live="polite" aria-busy="true">
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</div>
	);
}
