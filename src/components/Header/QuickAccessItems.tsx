import { fr } from '@codegouvfr/react-dsfr';
import Button from '@codegouvfr/react-dsfr/Button';
import { ReactNode, useEffect, useState, isValidElement } from 'react';
import type { HeaderProps } from '@codegouvfr/react-dsfr/Header';
import { AuthQuickAccess } from './AuthQuickAccess';

function Item({ content }: { content: HeaderProps.QuickAccessItem }) {
	if (content?.buttonProps) {
		return <ItemButton content={content} />;
	}
	if (isValidElement(content)) {
		return <li>{content}</li>;
	}
	if (content?.linkProps) {
		return <ItemLink content={content} />;
	}

	return null;
}

function ItemButton({ content }: { content: HeaderProps.QuickAccessItem }) {
	return (
		<li>
			<Button iconId={content.iconId} onClick={content.buttonProps?.onClick}>
				{content.text}
			</Button>
		</li>
	);
}

function ItemLink({ content }: { content: any }) {
	return (
		<li>
			<Button
				iconId={content.iconId}
				linkProps={{
					rel:
						content.linkProps?.target === '_blank'
							? 'noopener noreferrer'
							: undefined,
					target: content.linkProps?.target,
					to: content.linkProps?.href,
					title:
						content.linkProps?.target === '_blank'
							? `${content.text} - ouvre une nouvelle fenêtre`
							: (content.text as string),
				}}
			>
				{content.text}
			</Button>
		</li>
	);
}

function ParametresAffichage() {
	return (
		<li>
			<Button
				aria-controls="fr-theme-modal"
				data-fr-opened="false"
				iconId="fr-icon-theme-fill"
			>
				Paramètres d'affichage
			</Button>
		</li>
	);
}

export function QuickAccessItems({
	quickAccessItems,
}: {
	quickAccessItems?: HeaderProps.QuickAccessItem[];
}) {
	const [items, setItems] = useState<ReactNode>([]);

	useEffect(() => {
		setItems([<ParametresAffichage key={0} />, <AuthQuickAccess key={1} />]);
	}, []);

	useEffect(() => {
		if (quickAccessItems) {
			setItems([
				<ParametresAffichage key={0} />,
				...quickAccessItems.map((item, i) => (
					<Item content={item} key={i + 1} />
				)),
				<AuthQuickAccess key={quickAccessItems.length + 1} />,
			]);
		}
	}, [quickAccessItems]);

	return <ul className={fr.cx('fr-btns-group')}>{items}</ul>;
}
