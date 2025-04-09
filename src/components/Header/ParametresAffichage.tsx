import Sun from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/environment/sun.svg';
import Moon from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/environment/moon.svg';
import System from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/system.svg';

export function ParametresAffichage() {
	return (
		<dialog
			id="fr-theme-modal"
			className="fr-modal"
			aria-labelledby="fr-theme-modal-title"
		>
			<div className="fr-container fr-container--fluid fr-container-md">
				<div className="fr-grid-row fr-grid-row--center">
					<div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
						<div className="fr-modal__body">
							<div className="fr-modal__header">
								<button
									className="fr-btn--close fr-btn"
									aria-controls="fr-theme-modal"
									id="button-5622"
									title="Fermer"
								>
									Fermer
								</button>
							</div>
							<div className="fr-modal__content">
								<h1 id="fr-theme-modal-title" className="fr-modal__title">
									Paramètres d’affichage
								</h1>
								<div id="fr-display" className="fr-display">
									<fieldset className="fr-fieldset" id="display-fieldset">
										<legend
											className="fr-fieldset__legend--regular fr-fieldset__legend"
											id="display-fieldset-legend"
										>
											Choisissez un thème pour personnaliser l’apparence du
											site.
										</legend>
										<div className="fr-fieldset__element">
											<div className="fr-radio-group fr-radio-rich">
												<input
													value="light"
													type="radio"
													id="fr-radios-theme-light"
													name="fr-radios-theme"
												/>
												<label
													className="fr-label"
													htmlFor="fr-radios-theme-light"
												>
													Thème clair
												</label>
												<div className="fr-radio-rich__img">
													<svg
														aria-hidden="true"
														className="fr-artwork"
														viewBox="0 0 80 80"
														width="80px"
														height="80px"
													>
														<use
															className="fr-artwork-decorative"
															xlinkHref={`${Sun}#artwork-decorative`}
														></use>
														<use
															className="fr-artwork-minor"
															xlinkHref={`${Sun}#artwork-minor`}
														></use>
														<use
															className="fr-artwork-major"
															xlinkHref={`${Sun}#artwork-major`}
														></use>
													</svg>
												</div>
											</div>
										</div>
										<div className="fr-fieldset__element">
											<div className="fr-radio-group fr-radio-rich">
												<input
													value="dark"
													type="radio"
													id="fr-radios-theme-dark"
													name="fr-radios-theme"
												/>
												<label
													className="fr-label"
													htmlFor="fr-radios-theme-dark"
												>
													Thème sombre
												</label>
												<div className="fr-radio-rich__img">
													<svg
														aria-hidden="true"
														className="fr-artwork"
														viewBox="0 0 80 80"
														width="80px"
														height="80px"
													>
														<use
															className="fr-artwork-decorative"
															xlinkHref={`${Moon}#artwork-decorative`}
														></use>
														<use
															className="fr-artwork-minor"
															xlinkHref={`${Moon}#artwork-minor`}
														></use>
														<use
															className="fr-artwork-major"
															xlinkHref={`${Moon}#artwork-major`}
														></use>
													</svg>
												</div>
											</div>
										</div>
										<div className="fr-fieldset__element">
											<div className="fr-radio-group fr-radio-rich">
												<input
													value="system"
													type="radio"
													id="fr-radios-theme-system"
													name="fr-radios-theme"
												/>
												<label
													className="fr-label"
													htmlFor="fr-radios-theme-system"
												>
													Système
													<span className="fr-hint-text">
														Utilise les paramètres système
													</span>
												</label>
												<div className="fr-radio-rich__img">
													<svg
														aria-hidden="true"
														className="fr-artwork"
														viewBox="0 0 80 80"
														width="80px"
														height="80px"
													>
														<use
															className="fr-artwork-decorative"
															xlinkHref={`${System}#artwork-decorative`}
														></use>
														<use
															className="fr-artwork-minor"
															href={`${System}#artwork-minor`}
														></use>
														<use
															className="fr-artwork-major"
															href={`${System}#artwork-major`}
														></use>
													</svg>
												</div>
											</div>
										</div>
									</fieldset>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</dialog>
	);
}
