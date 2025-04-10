import { DraftBannerContainer } from './DraftBannerContainer';
import { BannerAddress } from './BannerAddress';
import { SavingBadge } from './SavingBadge';

export function DraftBanner() {
	return (
		<DraftBannerContainer>
			<SavingBadge />
			<BannerAddress />
		</DraftBannerContainer>
	);
}
