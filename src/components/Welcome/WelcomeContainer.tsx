import { Button } from '@codegouvfr/react-dsfr/Button';
import { Skeleton } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fr } from '@codegouvfr/react-dsfr';
import { useColors } from '@codegouvfr/react-dsfr/useColors';
import { useAuth, useAuthUser } from '../../lib/oidc';
import ConvertContent from '../../utils/convertContent';
import { themeStringToVariable } from '../../utils/themeStringToVariable';
import { RespondantsList } from './RespondantsList';
import { WelcomeQuestions } from './WelcomeQuestions';
import { useAppSelector } from '../../redux/store';
import { useGetSurveyAPI } from '../../lib/api/useGetSurveyUnitAPI';

export function WelcomeContainer() {
	const theme = useColors();
	const navigate = useNavigate();
	const unit = useAppSelector((s) => s.stromae.unit);
	const { oidcUser } = useAuthUser();
	const { login } = useAuth();

	const survey = useAppSelector((state) => state.stromae.survey);
	const { metadata } = useGetSurveyAPI({ survey });

	const onClick = useCallback(() => {
		if (oidcUser && survey && unit) {
			navigate(`/questionnaire/${survey}/unite-enquetee/${unit}`);
		} else {
			login('/');
		}
	}, [oidcUser, login, survey, unit, navigate]);

	if (!metadata) {
		return <Skeleton />;
	}

	const welcome = metadata.Welcome;
	return (
		<div>
			<div
				className={fr.cx(
					'fr-container',
					'fr-grid-row',
					'fr-grid-row--center',
					'fr-grid-row--middle',
					'fr-my-2w',
					'fr-my-md-8w'
				)}
			>
				<div className={fr.cx('fr-col-12')}>
					<div
						className={fr.cx(
							'fr-grid-row',
							'fr-grid-row--center',
							'fr-grid-row--middle'
						)}
					>
						<div className={fr.cx('fr-col-md-6', 'fr-col-12')}>
							<h2>Bienvenue sur l'{welcome.Enq_LibelleEnquete}</h2>

							<ConvertContent content={welcome.Enq_ObjectifsCourts} />

							<RespondantsList respondants={welcome.whoAnswers} />
							<Button size="large" onClick={onClick}>
								Commencer
							</Button>
						</div>
						{welcome.Enq_Image && (
							<div className={fr.cx('fr-col-md-4', 'fr-col-8', 'fr-mt-2w')}>
								<img
									className={fr.cx('fr-responsive-img')}
									src={welcome.Enq_Image}
									alt=""
								></img>
							</div>
						)}
					</div>
				</div>
			</div>

			<div
				className={fr.cx(
					'fr-p-6w',
					'fr-grid-row',
					'fr-grid-row--center',
					'fr-grid-row--middle'
				)}
				style={{
					backgroundColor: themeStringToVariable(
						theme,
						welcome.Enq_colorTheme,
						theme.decisions.background.default.grey.default
					),
				}}
			>
				<div className={fr.cx('fr-col-xl-6', 'fr-col-lg-10', 'fr-col-12')}>
					<h2 className={fr.cx('fr-h4')}>
						En savoir plus sur l'{welcome.Enq_LibelleEnquete}
					</h2>
					<WelcomeQuestions welcome={metadata.Welcome} />
				</div>
			</div>
		</div>
	);
}
