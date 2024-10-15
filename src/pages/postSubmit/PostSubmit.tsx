import { Layout } from '../../components/layout';
import { PostSubmitSurvey } from '../../components/postSubmit';
import { AuthSecure } from '../../lib/oidc';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { useStromaePage } from '../../hooks/useStromaePage';

export function PostSubmit() {
	useDocumentTitle('Le recensement de la population | Page post envoi');
	useStromaePage();

	return (
		<AuthSecure>
			<Layout>
				<PostSubmitSurvey />
			</Layout>
		</AuthSecure>
	);
}
