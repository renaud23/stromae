import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CollectStatusEnum } from '../../typeStromae/type';
import { uri404, uriPostEnvoi } from '../../lib/domainUri';
import { useAppSelector } from '../../redux/store';

/**
 * If collectStatus === Validated redirect user
 * to the postSubmit page.
 *
 */
export function useRedirectIfAlreadyValidated() {
	const unit = useAppSelector((s) => s.stromae.unit);
	const survey = useAppSelector((s) => s.stromae.survey);
	const collectStatus = useAppSelector((s) => s.stromae.collectStatus);

	const navigate = useNavigate();

	useEffect(() => {
		if (collectStatus === CollectStatusEnum.Validated) {
			if (unit && survey) {
				navigate(uriPostEnvoi(survey, unit));
			} else {
				navigate(uri404());
			}
		}
	}, [collectStatus, navigate, unit, survey]);
}
