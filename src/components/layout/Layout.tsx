import { PropsWithChildren, useEffect } from 'react';
import SkipLinks from '@codegouvfr/react-dsfr/SkipLinks';
import { Header } from '../Header';
import { HeaderAuth } from '../Header/HeaderAuth';
import { Footer } from '../footer/Footer';
import { Main } from './Main';
import { useGetMetadataSurveyQuery } from '../../lib/api/survey';
import { useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router';
import { uri404 } from '../../lib/domainUri';

type LayoutProps = {};

const defaultLinks = [
	{
		anchor: '#contenu',
		label: 'Aller au contenu de la page',
	},
];

export function Layout({ children, ...rest }: PropsWithChildren<LayoutProps>) {
	const survey = useAppSelector((state) => state.stromae.survey);
	const navigate = useNavigate();

	const { data, isFetching, isLoading, isSuccess, isError } =
		useGetMetadataSurveyQuery(survey, { skip: survey === 'undefined' });

	if (isFetching || isLoading) {
		<p>Les données de l'application sont en cours de chargement.</p>;
	}

	useEffect(() => {
		if (isError) {
			navigate(uri404());
		}
	}, [isError, navigate]);

	if (isSuccess) {
		const { Header: header, Footer: footer } = data;
		return (
			<>
				<SkipLinks links={defaultLinks} />
				<HeaderAuth>
					<Header header={header} />
				</HeaderAuth>
				<Main id="contenu">{children}</Main>
				<Footer footer={footer} />
			</>
		);
	}
	return null;
}
