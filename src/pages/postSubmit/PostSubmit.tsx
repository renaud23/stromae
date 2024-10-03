import { useParams } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { PostSubmitSurvey } from '../../components/postSubmit';
import { AuthSecure } from '../../lib/oidc';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

export function PostSubmit() {
	const { survey, unit } = useParams();
	useDocumentTitle('Le recensement de la population | Page post envoi');

	return (
		<AuthSecure>
			<Layout>
				<PostSubmitSurvey />
			</Layout>
		</AuthSecure>
	);
}