import { useCallback } from 'react'

import { useOidc } from '@axa-fr/react-oidc'
import { fr } from '@codegouvfr/react-dsfr'
import { Button } from '@codegouvfr/react-dsfr/Button'
import { useColors } from '@codegouvfr/react-dsfr/useColors'
import { Skeleton } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { useMetadata } from '../../hooks/useMetadata'
import { useAuthUser } from '../../lib/oidc'
import ConvertContent from '../../utils/convertContent'
import { themeStringToVariable } from '../../utils/themeStringToVariable'
import { useDocumentTitle } from '../../utils/useDocumentTitle'
import { RespondantsList } from './RespondantsList'
import { WelcomeQuestions } from './WelcomeQuestions'

export function WelcomeContainer() {
  const theme = useColors()
  const navigate = useNavigate()
  const { survey, unit } = useParams()
  const { oidcUser } = useAuthUser()
  const { login } = useOidc()

  const metadata = useMetadata(survey)
  const welcome = metadata?.Welcome
  useDocumentTitle("Page d'accueil")

  const onClick = useCallback(() => {
    if (oidcUser && survey && unit) {
      navigate(`/questionnaire/${survey}/unite-enquetee/${unit}`)
    } else {
      login('/')
    }
  }, [oidcUser, login, survey, unit, navigate])

  if (!metadata || !welcome) {
    return <Skeleton />
  }
  return (
    <div>
      <div
        className={fr.cx(
          'fr-container',
          'fr-grid-row',
          'fr-grid-row--center',
          'fr-grid-row--middle',
          'fr-my-2w',
          'fr-my-md-8w',
        )}
      >
        <div className={fr.cx('fr-col-12')}>
          <div
            className={fr.cx(
              'fr-grid-row',
              'fr-grid-row--center',
              'fr-grid-row--middle',
            )}
          >
            <div className={fr.cx('fr-col-md-6', 'fr-col-12')}>
              <h2>Bienvenue sur l'{welcome.Enq_LibelleEnquete}</h2>

              <ConvertContent content={welcome.Enq_ObjectifsCourts} />

              <RespondantsList respondants={welcome.whoAnswers} />
              <Button size="large" onClick={onClick}>
                Commencer
              </Button>
            </div>
            {welcome.Enq_Image && (
              <div className={fr.cx('fr-col-md-4', 'fr-col-8', 'fr-mt-2w')}>
                <img
                  className={fr.cx('fr-responsive-img')}
                  src={welcome.Enq_Image}
                  alt=""
                ></img>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={fr.cx(
          'fr-p-6w',
          'fr-grid-row',
          'fr-grid-row--center',
          'fr-grid-row--middle',
        )}
        style={{
          backgroundColor: themeStringToVariable(
            theme,
            welcome.Enq_colorTheme,
            theme.decisions.background.default.grey.default,
          ),
        }}
      >
        <div className={fr.cx('fr-col-xl-6', 'fr-col-lg-10', 'fr-col-12')}>
          <h2 className={fr.cx('fr-h4')}>
            En savoir plus sur l'{welcome.Enq_LibelleEnquete}
          </h2>
          <WelcomeQuestions welcome={welcome} />
        </div>
      </div>
    </div>
  )
}
