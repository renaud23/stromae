import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTypeEnum, environment } from '../../utils/read-env-vars';

const { DEFAULT_SURVEY, AUTH_TYPE, VISUALIZE_ENABLED } = environment;
export const visualizeRoutingEnabled =
	AUTH_TYPE === AuthTypeEnum.None && VISUALIZE_ENABLED;

export function RoutingPortal() {
	const navigate = useNavigate();

	useEffect(() => {
		if (DEFAULT_SURVEY) {
			navigate(`/questionnaire/${DEFAULT_SURVEY}`);
		} else {
			navigate(`/404`);
		}
	}, [navigate]);

	return <></>;
}
