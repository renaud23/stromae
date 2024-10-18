import { useContext, useEffect, useState } from 'react';
import { LunaticError } from '../../typeLunatic/type';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { LunaticContext } from '../../pages/questionnaire/lunaticContext';
import { terminateControls } from '../../redux/appSlice';

function isOnError(errors?: Record<string, LunaticError[]>) {
	return errors !== undefined && Object.values(errors).length > 0;
}

/**
 * Compile les controles et met à jour l'état applicatif selon leurs résultats.
 * Les erreurs contiennent des composants React et ne peuvent donc ête directement
 * stockés dans redux : ils sont conservés dans le hook et consommé directement dans les composants
 * qui veulent les présenter.
 * @returns
 */
export function useControls(): Record<string, Array<LunaticError>> | undefined {
	const [controls, setControls] =
		useState<Record<string, Array<LunaticError>>>();
	const startControls = useAppSelector((s) => s.stromae.startControls);
	const isOnWarning = useAppSelector((s) => s.stromae.isOnWarning);
	const dispatch = useAppDispatch();
	const { compileControls } = useContext(LunaticContext);

	useEffect(() => {
		if (startControls && compileControls) {
			const { isCritical, currentErrors } = compileControls();
			if (isOnWarning && !isCritical) {
				// si on est déjà en warning mais qu'il n'y a pas d'erreur, on bypass les warning
				dispatch(
					terminateControls({
						isOnError: false,
						isOnWarning: false,
					})
				);
				setControls(undefined);
			} else {
				dispatch(
					terminateControls({
						isOnError: isCritical,
						isOnWarning: !isCritical && isOnError(currentErrors),
					})
				);
				setControls(currentErrors);
			}
		}
	}, [compileControls, controls, dispatch, isOnWarning, startControls]);

	return controls;
}
