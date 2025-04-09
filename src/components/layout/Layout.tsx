import { PropsWithChildren, useEffect, useState } from 'react';
import SkipLinks from '@codegouvfr/react-dsfr/SkipLinks';
import { FooterType } from '../footer/FooterType';
import { HeaderType } from '../Header/HeaderType';
import { Header } from '../Header';
import { Footer } from '../footer/Footer';
import { Layout as LayoutSkeleton } from '../skeleton/Layout';
import { Main } from './Main';
import { useParams } from 'react-router';
import { useMetadata } from '../../hooks/useMetadata';

const defaultLinks = [
	{
		anchor: '#contenu',
		label: 'Aller au contenu de la page',
	},
];

export function Layout({ children }: PropsWithChildren) {
	const { survey } = useParams();
	const [header, setHeader] = useState<HeaderType | undefined>(undefined);
	const [footer, setFooter] = useState<FooterType | undefined>(undefined);

	const metadata = useMetadata(survey);

	useEffect(() => {
		if (metadata?.Header && metadata?.Footer) {
			setHeader(metadata.Header);
			setFooter(metadata.Footer);
		}
	}, [metadata]);

	if (!header || !footer) {
		return <LayoutSkeleton />;
	}

	return (
		<>
			<SkipLinks links={defaultLinks} />
			<Header header={header} />
			<Main id="contenu">{children}</Main>
			<Footer footer={footer} />
		</>
	);
}
