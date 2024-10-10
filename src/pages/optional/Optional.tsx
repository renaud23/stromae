import { useParams } from 'react-router';
import { Layout } from '../../components/layout';
import { OptionalPage } from '../../components/OptionalPage';

export function Optional() {
	const { optional } = useParams();

	return (
		<Layout>
			<OptionalPage name={optional} />
		</Layout>
	);
}
