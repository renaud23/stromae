import { AlertesSaving } from '../../components/AlertSaving/AlertesSaving';
import { AlertesControles } from '../../components/AlertesControles';
import { ComplementaryComponents } from '../../components/ComplementaryComponents/ComplementaryComponents';
import { ContinueOrRestart } from '../../components/ContinueOrRestart/ContinueOrRestart';
import { DevOptions } from '../../components/DevOptions';
import { DraftBanner } from '../../components/DraftBanner/DraftBanner';
import { Grid } from '../../components/Grid/Grid';
import { Formulaire } from '../../components/formulaire';
import { Layout } from '../../components/layout';
import { Modals } from '../../components/modals';
import { Continuer } from '../../components/navigation/Continuer';
import { Precedent } from '../../components/navigation/Precedent';
import { AuthSecure } from '../../lib/oidc';
import { useOrchestrator } from '../../components/orchestrator/useOrchestrator';
import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { Content } from '../../components/skeleton/Content';
import { useRedirectIfAlreadyValidated } from '../../components/orchestrator/useRedirectIfAlreadyValidated';
import { LunaticContext } from './lunaticContext';
import { useGetSurveyAPI } from '../../lib/api/useGetSurveyUnitAPI';
import { useStromaePage } from '../../hooks/useStromaePage';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import { defineCollectStatus } from '../../redux/appSlice';
import { useQuestionnaireTitle } from '../../components/orchestrator/useQuestionnaireTitle';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

export function Questionnaire() {
	useRedirectIfAlreadyValidated();
	const { survey, unit } = useStromaePage();
	const { source, data, metadata } = useGetSurveyAPI({ survey, unit });
	useQuestionnaireTitle('Questionnaire', metadata, source);
	const collectStatus = data?.stateData.state;

	const dispatch = useAppDispatch();

	/* initialisation du status à l'arrivée sur le questionnaire, avec la valeur issue de l'API */
	useEffect(() => {
		dispatch(defineCollectStatus(collectStatus));
	}, [collectStatus, dispatch]);

	if (source && data) {
		return <DisplayQuestionnaire source={source} data={data} />;
	}
	return <Content />;
}

function DisplayQuestionnaire({
	source,
	data,
}: {
	source: LunaticSource;
	data: SurveyUnitData;
}) {
	const { isFirstPage, isLastPage, Provider, ...comportements } =
		useOrchestrator({ source, data: data?.data });

	return (
		<AuthSecure>
			<Provider>
				<LunaticContext.Provider value={comportements}>
					<Layout>
						<DraftBanner />
						<ContinueOrRestart />
						<Precedent />
						<Grid>
							<AlertesSaving />
							<AlertesControles />
							<Formulaire />
							<Modals />
							<Continuer />
						</Grid>
						<ComplementaryComponents />
						<DevOptions />
					</Layout>
				</LunaticContext.Provider>
			</Provider>
		</AuthSecure>
	);
}
