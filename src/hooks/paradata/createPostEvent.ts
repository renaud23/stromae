import { uriParadata } from '../../lib/domainUri';
import { environment } from '../../utils/read-env-vars';

export type eventType = {
	type: string;
	element: string;
	timestamp: number;
	value?: string | undefined;
};

export function createPostEvent({ unit }: { unit?: string }) {
	let stack: eventType[] = [];
	const sendLimit = 5;

	async function postIt(changePage = false, args?: eventType) {
		if (args) stack.push(args);
		if (stack.length >= sendLimit || changePage) {
			const tempStack = stack;

			if (tempStack.length && unit) {
				fetch(`${environment.PARADATA_DOMAIN}${uriParadata(unit)}`, {
					headers: {},
					method: 'POST',
					body: JSON.stringify(stack),
				}).catch(() => {
					console.warn(
						'paradata fail',
						`${environment.PARADATA_DOMAIN}${uriParadata(unit)}`,
						stack
					);
				});
			}
			stack = [];
		}
	}

	return postIt;
}
