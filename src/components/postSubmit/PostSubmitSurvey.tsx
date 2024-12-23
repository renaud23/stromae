import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fr } from '@codegouvfr/react-dsfr';
import { format } from 'date-fns';
import { fr as localeFr } from 'date-fns/esm/locale';
import { Skeleton } from '@mui/material';
import Confirmation from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/success.svg';
import { uri404 } from '../../lib/domainUri';
import { useGetSurveyAPI } from '../../lib/api/useGetSurveyUnitAPI';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { surveyAPI } from '../../lib/api/survey';
import { environment } from '../../utils/read-env-vars';
import AdditionalInformation from './AdditionalInformation';
import { CollectStatusEnum } from '../../typeStromae/type';

const { DEPOSIT_PROOF_FILE_NAME } = environment;

function parseDate(date?: number) {
	if (date !== undefined) {
		return format(new Date(date), 'EEEE d LLLL, à HH:mm', { locale: localeFr });
	}
	return '';
}

const depositProofURI = (unit: string) =>
	`${environment.DOMAIN}/api/survey-unit/${unit}/deposit-proof`;

function fetchDepositProof(unit: string) {
	return fetch(depositProofURI(unit)).then((r) => r.blob());
}

/*
 * Trouver une librairie plus sure.
 */
function download(data: BlobPart, unit: string) {
	const url = URL.createObjectURL(new Blob([data]));
	const aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = `${DEPOSIT_PROOF_FILE_NAME}-${unit}.pdf`;
	aLink.click();
}

export function PostSubmitSurvey() {
	const navigate = useNavigate();
	const unit = useAppSelector((s) => s.stromae.unit);
	const survey = useAppSelector((s) => s.stromae.survey);
	const [submissionDate, setSubmissionDate] = useState('');
	const { metadata, data } = useGetSurveyAPI({ survey, unit });

	const dispatch = useAppDispatch();
	const collectStatus = useAppSelector((s) => s.stromae.collectStatus);

	/**
	 * l'utilisateur arrive directement sur postenvoi, mais il n'a pas validé son questionnaire !
	 */
	useEffect(() => {
		if (
			!collectStatus &&
			data?.stateData.state !== CollectStatusEnum.Validated
		) {
			navigate('/');
		}
	}, [collectStatus, data, navigate]);

	useEffect(() => {
		if (unit) {
			(async () => {
				/* force refetch pour être sur de présenter la bonne heure de validation */
				const promise = dispatch(
					surveyAPI.endpoints.getSurveyUnit.initiate(unit)
				);
				const { data, isError } = await promise;
				if (isError) {
					navigate(uri404());
				}
				if (data) {
					setSubmissionDate(parseDate(data?.stateData?.date));
				}
			})();
		}
	}, [dispatch, navigate, unit]);

	const handleDepositProof = useCallback(async () => {
		if (unit) {
			const deposit = await fetchDepositProof(unit);
			download(deposit, unit);
		}
	}, [unit]);

	const submit = metadata?.Submit;
	const DescriptionAdditional = submit?.DescriptionAdditional ?? null;

	if (!metadata) {
		return <Skeleton />;
	}

	return (
		<>
			<div className={fr.cx('fr-col-12')}>
				<div className={fr.cx('fr-container')}>
					<div
						className={fr.cx(
							'fr-grid-row',
							'fr-grid-row--center',
							'fr-grid-row--middle',
							'fr-my-6w',
							'fr-my-md-12w'
						)}
					>
						<div
							className={fr.cx(
								'fr-col-12',
								'fr-col-offset-lg-1',
								'fr-col-lg-7',
								'fr-col-xl-7'
							)}
						>
							<h2>
								L'Insee vous remercie pour votre collaboration à cette enquête.
							</h2>
							<p className={fr.cx('fr-text--lead')}>
								Vos réponses ont été envoyées le {submissionDate}.&nbsp;
								{DescriptionAdditional}
							</p>

							<button onClick={handleDepositProof} className={fr.cx('fr-btn')}>
								Télécharger l'accusé de réception
							</button>
						</div>
						<div
							className={fr.cx(
								'fr-col-lg-3',
								'fr-col-xl-3',
								'fr-col-offset-lg-1',
								'fr-col-12',
								'fr-col--middle',
								'fr-btns-group--center'
							)}
						>
							<svg
								className={fr.cx('fr-artwork')}
								aria-hidden="true"
								viewBox="0 0 80 80"
								width="200"
								height="200"
							>
								<use
									className={fr.cx('fr-artwork-decorative')}
									xlinkHref={`${Confirmation}#artwork-decorative`}
								></use>
								<use
									className={fr.cx('fr-artwork-minor')}
									xlinkHref={`${Confirmation}#artwork-minor`}
								></use>
								<use
									className={fr.cx('fr-artwork-major')}
									xlinkHref={`${Confirmation}#artwork-major`}
								></use>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<AdditionalInformation submit={submit} />
		</>
	);
}
