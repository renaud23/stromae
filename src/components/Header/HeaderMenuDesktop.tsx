import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import { type HeaderProps } from '@codegouvfr/react-dsfr/Header'
import { Link } from 'react-router-dom'

import ConvertContent, {
  type ConvertContentType,
} from '../../utils/convertContent'
import { type QuickAccessItems } from './HeaderType'
import { DEFAULT_HEADER } from './default-header'

export function HeaderMenuDescktop({
  header,
  quickAccessItems,
}: {
  header?: HeaderProps
  quickAccessItems: Array<QuickAccessItems>
}) {
  if (!header) {
    return null
  }
  return (
    <div className={fr.cx('fr-container')}>
      <div className={fr.cx('fr-header__body-row')}>
        <div className={fr.cx('fr-header__brand', 'fr-enlarge-link')}>
          <div className={fr.cx('fr-header__brand-top')}>
            <div className={fr.cx('fr-header__logo')}>
              <ConvertContent
                content={
                  (header.brandTop ||
                    DEFAULT_HEADER.brandTop) as ConvertContentType
                }
                className="fr-logo"
              />
            </div>
            <div className={fr.cx('fr-header__operator')}>
              <img
                className={fr.cx('fr-responsive-img')}
                style={{
                  maxWidth: '3.5rem',
                  height: 'auto !important',
                  alignSelf: 'flex-start',
                }}
                src={
                  header.operatorLogo?.imgUrl ||
                  DEFAULT_HEADER.operatorLogo?.imgUrl
                }
                alt={
                  header.operatorLogo?.alt || DEFAULT_HEADER.operatorLogo?.alt
                }
              />
            </div>
            <div className={fr.cx('fr-header__navbar')}>
              <Button
                className={fr.cx('fr-btn--menu')}
                data-fr-opened="false"
                aria-controls="modal-577"
                aria-haspopup="menu"
                id="button-578"
                title="Menu"
              >
                Menu
              </Button>
            </div>
          </div>
          <div className={fr.cx('fr-header__service')}>
            <h1 className={fr.cx('fr-header__service-title')}>
              <Link
                to="/"
                title={`Accueil - ${header.homeLinkProps.title} - République Française`}
              >
                {header.serviceTitle || DEFAULT_HEADER.serviceTitle}
              </Link>
            </h1>
          </div>
        </div>
        <div className={fr.cx('fr-header__tools')}>
          <div className={fr.cx('fr-header__tools-links')}>
            <ul className={fr.cx('fr-btns-group')}>
              <li>
                <Button
                  aria-controls="fr-theme-modal"
                  data-fr-opened="false"
                  iconId="fr-icon-theme-fill"
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
                                ? 'noopener noreferrer'
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
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
