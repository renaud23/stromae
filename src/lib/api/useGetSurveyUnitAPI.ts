import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../redux/store';
import { useOidc } from '@axa-fr/react-oidc';
import { LunaticSource } from '../../typeLunatic/type-source';

import { useCallback, useEffect, useState } from 'react';
import { uri404 } from '../domainUri';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
import { surveyAPI } from './survey';
import { MetadataSurvey, SurveyUnitData } from '../../typeStromae/type';

function isUnauthorized(error: unknown) {
	if (
		error &&
		typeof error === 'object' &&
		'status' in error &&
		error?.status === 401
	) {
		return true;
	}
	return false;
}

async function resolve<U>(
	promise: QueryActionCreatorResult<any>,
	redirectLogin: () => void,
	redirect404: () => void
): Promise<U> {
	const { data, error } = await promise;

	if (error) {
		if (isUnauthorized(error)) {
			redirectLogin();
		} else {
			redirect404();
		}
	}
	return data as U;
}

export function useGetSurveyAPI({
	survey,
	unit,
}: {
	survey?: string;
	unit?: string;
}) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { login } = useOidc();
	const [source, setSource] = useState<LunaticSource>();
	const [metadata, setMetadata] = useState<MetadataSurvey>();
	const [data, setData] = useState<SurveyUnitData>();

	const redirectLogin = useCallback(() => {
		login('/');
	}, [login]);

	const redirect404 = useCallback(() => {
		navigate(uri404());
	}, [navigate]);

	useEffect(() => {
		if (survey) {
			const getMetadata = dispatch(
				surveyAPI.endpoints.getMetadataSurvey.initiate(survey)
			);
			(async () => {
				setMetadata(
					await resolve<MetadataSurvey>(getMetadata, redirectLogin, redirect404)
				);
			})();
		}
	}, [dispatch, redirect404, redirectLogin, survey]);

	useEffect(() => {
		if (survey) {
			const getSurvey = dispatch(
				surveyAPI.endpoints.getSurvey.initiate(survey)
			);
			(async () => {
				setSource(
					await resolve<LunaticSource>(getSurvey, redirectLogin, redirect404)
				);
			})();
		}
	}, [dispatch, redirect404, redirectLogin, survey]);

	useEffect(() => {
		if (unit) {
			const getSurveyUnit = dispatch(
				surveyAPI.endpoints.getSurveyUnit.initiate(unit)
			);
			(async () => {
				setData(
					await resolve<SurveyUnitData>(
						getSurveyUnit,
						redirectLogin,
						redirect404
					)
				);
			})();
		}
	}, [dispatch, redirect404, redirectLogin, unit]);

	return { source, data, metadata };
}
