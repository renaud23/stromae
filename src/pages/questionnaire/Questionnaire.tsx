import { AlertesSaving } from '../../components/AlertSaving/AlertesSaving';
import { AlertesControles } from '../../components/AlertesControles';
import { ComplementaryComponents } from '../../components/ComplementaryComponents/ComplementaryComponents';
import { ContinueOrRestart } from '../../components/ContinueOrRestart/ContinueOrRestart';
import { DevOptions } from '../../components/DevOptions';
import { DraftBanner } from '../../components/DraftBanner/DraftBanner';
import { Grid } from '../../components/Grid/Grid';
import { Formulaire } from '../../components/formulaire';
import { Layout } from '../../components/layout';
import { Continuer } from '../../components/navigation/Continuer';
import { Precedent } from '../../components/navigation/Precedent';
import { Orchestrator } from '../../components/orchestrator';
import { AuthSecure } from '../../lib/oidc';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

export type QuestionnaireProps = {};

const FEATURES = ['VTL', 'MD'];
const COLLECTED = 'COLLECTED';

export function Questionnaire(props: QuestionnaireProps) {
	useDocumentTitle('Questionnaire');

	return (
		<AuthSecure>
			<Layout>
				<Orchestrator features={FEATURES} savingType={COLLECTED}>
					<DraftBanner />
					<ContinueOrRestart />
					<Precedent />
					<Grid>
						<AlertesSaving />
						<AlertesControles />
						<Formulaire />
						<Continuer />
					</Grid>
					<ComplementaryComponents />
					<DevOptions />
				</Orchestrator>
			</Layout>
		</AuthSecure>
	);
}
