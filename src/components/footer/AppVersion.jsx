import { lunaticVersion, stromaeVersion } from '../../utils/app/index';

export function AppVersion({ className, appSupplementaire }) {
	return (
		<span
			className={className}
		>{`Stromae : ${stromaeVersion} | Lunatic : ${lunaticVersion}${
			appSupplementaire ?? ''
		}`}</span>
	);
}
