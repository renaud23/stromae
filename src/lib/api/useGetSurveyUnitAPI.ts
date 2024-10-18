import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../redux/store';
import { useOidc } from '@axa-fr/react-oidc';
import { LunaticSource } from '../../typeLunatic/type-source';
import { useCallback, useEffect, useState } from 'react';
import { uri404 } from '../domainUri';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
import { surveyAPI, UNINITIALIZE } from './survey';
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
): Promise<U | undefined> {
	const { data, error } = await promise;
	try {
		if (error) {
			if (isUnauthorized(error)) {
				redirectLogin();
			} else {
				redirect404();
			}
		}
		return data as U;
	} catch (e) {
		redirect404();
		return undefined;
	}
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
		if (survey && survey !== UNINITIALIZE) {
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
		if (survey && survey !== UNINITIALIZE) {
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
		if (unit && survey !== UNINITIALIZE) {
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
	}, [dispatch, redirect404, redirectLogin, survey, unit]);

	return { source, data, metadata };
}
