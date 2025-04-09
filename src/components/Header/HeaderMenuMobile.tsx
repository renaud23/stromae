import { fr } from '@codegouvfr/react-dsfr';
import Button from '@codegouvfr/react-dsfr/Button';
import { QuickAccessItems } from './HeaderType';

export function HeaderMenuMobile({
	quickAccessItems,
}: {
	quickAccessItems: Array<QuickAccessItems>;
}) {
	return (
		<div
			className={fr.cx('fr-header__menu', 'fr-modal')}
			id="modal-577"
			aria-labelledby="button-578"
		>
			<div className={fr.cx('fr-container')}>
				<Button
					className={fr.cx('fr-btn--close')}
					aria-controls="modal-577"
					title="Fermer"
				>
					Fermer
				</Button>
				<div className={fr.cx('fr-header__menu-links')}>
					<ul className={fr.cx('fr-btns-group')}>
						<li>
							<Button
								iconId="fr-icon-theme-fill"
								aria-controls="fr-theme-modal"
								data-fr-opened="false"
							>
								Paramètres d'affichage
							</Button>
						</li>
						{quickAccessItems &&
							quickAccessItems.map((quickAccessItem, index) => {
								return (
									<li key={index}>
										{quickAccessItem.buttonProps ? (
											<Button
												iconId={quickAccessItem.iconId}
												onClick={quickAccessItem.buttonProps.onClick}
											>
												{quickAccessItem.text}
											</Button>
										) : (
											<Button
												iconId={quickAccessItem.iconId}
												linkProps={{
													rel:
														quickAccessItem.linkProps?.target === '_blank'
															? 'noopener, noreferrer'
															: undefined,
													target: quickAccessItem.linkProps?.target,
													to: quickAccessItem.linkProps?.href,
													title:
														quickAccessItem.linkProps?.target === '_blank'
															? `${quickAccessItem.text} - ouvre une nouvelle fenêtre`
															: quickAccessItem.text,
												}}
											>
												{quickAccessItem.text}
											</Button>
										)}
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</div>
	);
}
