import { PropsWithChildren } from 'react';
import SkipLinks from '@codegouvfr/react-dsfr/SkipLinks';
import { Header } from '../Header';
import { Footer } from '../footer/Footer';
import { Main } from './Main';
import { useAppSelector } from '../../redux/store';
import { useGetSurveyAPI } from '../../lib/api/useGetSurveyUnitAPI';

type LayoutProps = {};

const defaultLinks = [
	{
		anchor: '#contenu',
		label: 'Aller au contenu de la page',
	},
];

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
	const survey = useAppSelector((state) => state.stromae.survey);
	const { metadata } = useGetSurveyAPI({ survey });

	if (metadata) {
		const { Header: header, Footer: footer } = metadata;
		return (
			<>
				<SkipLinks links={defaultLinks} />
				<Header header={header} />

				<Main id="contenu">{children}</Main>
				<Footer footer={footer} />
			</>
		);
	}
	return null;
}
