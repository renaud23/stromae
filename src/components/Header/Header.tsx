import { useState, useEffect } from 'react';
import { HeaderType } from './HeaderType';
import { fr } from '@codegouvfr/react-dsfr';
import { useAuthentification } from '../orchestrator/useAuthentification';
import { ParametresAffichage } from './ParametresAffichage';
import { HeaderMenuDescktop } from './HeaderMenuDesktop';

import { HeaderMenuMobile } from './HeaderMenuMobile';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const iconContact = fr.cx('fr-icon-questionnaire-line');

function getAuthLabel(isAuthenticated: boolean): string {
	if (isAuthenticated) {
		return 'Me déconnecter';
	}
	return 'Me connecter';
}

export type HeaderProps = {
	header?: HeaderType;
	readonly handleOidcAuth?: () => void;
	isAuthenticated?: boolean;
};

export function Header(props: HeaderProps) {
	const { header } = props;
	const { loginOrLogout, isAuthenticated } = useAuthentification();
	const [quickAccessItems, setQuickAccessItems] = useState<Array<any>>([]);

	useEffect(() => {
		const others = header?.quickAccessItems || [];
		setQuickAccessItems([
			...others,
			{
				iconId: 'fr-icon-lock-line',
				buttonProps: {
					onClick: loginOrLogout,
				},
				text: getAuthLabel(isAuthenticated),
			},
		]);
	}, [isAuthenticated, loginOrLogout, header]);

	return (
		<>
			<header role="banner" className={fr.cx('fr-header')} id="header">
				<HeaderMenuDescktop
					header={header}
					quickAccessItems={quickAccessItems}
				/>
				<HeaderMenuMobile quickAccessItems={quickAccessItems} />
			</header>
			<ParametresAffichage />
		</>
	);
}
