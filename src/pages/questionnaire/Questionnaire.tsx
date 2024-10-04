import { useParams } from 'react-router-dom';
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
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { useAppDispatch } from '../../redux/store';
import {
	UNINITIALIZE,
	useGetSurveyQuery,
	useGetSurveyUnitQuery,
} from '../../lib/api/survey';
import { defineSurveyUnit, defineCollectStatus } from '../../redux/appSlice';
import { useOrchestrator } from '../../components/orchestrator/useOrchestrator';
import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { Content } from '../../components/skeleton/Content';
import { useRedirectIfAlreadyValidated } from '../../components/orchestrator/useRedirectIfAlreadyValidated';
import { useEffect } from 'react';
import { LunaticContext } from './lunaticContext';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

export function Questionnaire() {
	const { survey = UNINITIALIZE, unit = UNINITIALIZE } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (survey && unit) {
			dispatch(defineSurveyUnit({ survey, unit }));
		}
	}, [dispatch, survey, unit]);

	// TODO gérer isLoading
	const { isFetching, isLoading, data, isError } = useGetSurveyUnitQuery(unit, {
		skip: unit === UNINITIALIZE,
	});

	const { data: source } = useGetSurveyQuery(survey, {
		skip: survey === UNINITIALIZE,
	});

	useEffect(() => {
		if (data?.stateData.state) {
			dispatch(defineCollectStatus(data.stateData.state));
		}
	}, [dispatch, data]);

	if (source && data) {
		return <QuestionnaireReady source={source} data={data} />;
	}
	return <Content />;
}

function QuestionnaireReady({
	source,
	data,
}: {
	source: LunaticSource;
	data: SurveyUnitData;
}) {
	useDocumentTitle('Questionnaire');
	useRedirectIfAlreadyValidated();

	const {
		isFirstPage,
		isLastPage,
		Provider,
		pageTag,
		pager,
		...comportements
	} = useOrchestrator({ source, data: data?.data });

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
