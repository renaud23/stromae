import { environment } from '../../utils/read-env-vars'
import { type HeaderType } from './HeaderType'

const { PUBLIC_URL } = environment

export const DEFAULT_HEADER: HeaderType = {
  brandTop: 'Intitulé',
  quickAccessItems: [],
  homeLinkProps: {
    to: '/',
    title:
      'Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)',
  },
  serviceTitle: 'Titre par défaut',
  operatorLogo: {
    alt: '[À MODIFIER - texte alternatif de l’image]',
    imgUrl: `${PUBLIC_URL}/logoINSEE.png`,
    orientation: 'horizontal',
  },
}
