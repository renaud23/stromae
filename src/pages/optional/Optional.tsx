import { Layout } from '../../components/layout';
import { OptionalPage } from '../../components/OptionalPage';
import { useStromaePage } from '../../hooks/useStromaePage';

export function Optional() {
	const { optional } = useStromaePage();

	return (
		<Layout>
			<OptionalPage name={optional} />
		</Layout>
	);
}
