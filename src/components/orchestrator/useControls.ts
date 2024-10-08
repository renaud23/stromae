import { useCallback, useRef } from 'react';
import { LunaticError } from '../../typeLunatic/type';
import { useAppDispatch } from '../../redux/store';
import { defineCurrentErrors } from '../../redux/appSlice';

type CompileControls = () => {
	isCritical: boolean;
	currentErrors?: Record<string, Array<LunaticError>>;
};

export function useControls(compileControls?: CompileControls) {
	const dispatch = useAppDispatch();
	const isOnWarning = useRef(false);

	const compileErrors = useCallback(() => {
		if (typeof compileControls === 'function') {
			if (isOnWarning.current) {
				isOnWarning.current = false;
				dispatch(
					defineCurrentErrors({ currentErrors: undefined, isCritical: false })
				);
				return {
					isCritical: false,
					isOnWarning: false,
				};
			} else {
				const compiled = compileControls();
				if (compiled.currentErrors) {
					dispatch(defineCurrentErrors(compiled));
					if (compiled.isCritical) {
						isOnWarning.current = false;
						return {
							isCritical: true,
							isOnWarning: false,
						};
					} else {
						isOnWarning.current = true;
						return {
							isCritical: false,
							isOnWarning: true,
						};
					}
				}
			}
		}
		return {
			isCritical: undefined,
			isOnWarning: undefined,
		};
	}, [compileControls, dispatch]);

	return compileErrors;
}
