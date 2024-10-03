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
import { Orchestrator } from '../../components/orchestrator';
import { AuthSecure } from '../../lib/oidc';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import {
	UNINITIALIZE,
	useGetSurveyQuery,
	useGetSurveyUnitQuery,
} from '../../lib/api/survey';
import { defineSurveyUnit, defineCollectStatus } from '../../redux/appSlice';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

export type QuestionnaireProps = {};

const FEATURES = ['VTL', 'MD'];
const COLLECTED = 'COLLECTED';

export function Questionnaire(props: QuestionnaireProps) {
	const { survey = UNINITIALIZE, unit = UNINITIALIZE } = useParams();
	useDocumentTitle('Questionnaire');

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (survey && unit) {
			dispatch(defineSurveyUnit({ survey, unit }));
		}
	}, [dispatch, survey, unit]);

	const { data: source } = useGetSurveyQuery(survey, {
		skip: survey === UNINITIALIZE,
	});

	const {
		isFetching,
		isLoading,
		data: surveyUnitData,
		isError,
	} = useGetSurveyUnitQuery(unit, { skip: unit === UNINITIALIZE });

	useEffect(() => {
		if (surveyUnitData?.stateData.state) {
			dispatch(defineCollectStatus(surveyUnitData.stateData.state));
		}
	}, [dispatch, surveyUnitData]);

	if (source && surveyUnitData) {
		return (
			<AuthSecure>
				<Layout>
					<Orchestrator
						features={FEATURES}
						savingType={COLLECTED}
						source={source}
						surveyUnitData={surveyUnitData}
					>
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
					</Orchestrator>
				</Layout>
			</AuthSecure>
		);
	}
	return <>Loading...</>;
}
