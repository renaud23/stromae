import { type PropsWithChildren, useEffect, useState } from 'react'

import SkipLinks from '@codegouvfr/react-dsfr/SkipLinks'
import { useParams } from 'react-router'

import { useMetadata } from '../../hooks/useMetadata'
import { Header } from '../Header'
import { type HeaderType } from '../Header/HeaderType'
import { Footer } from '../footer/Footer'
import { type FooterType } from '../footer/FooterType'
import { Layout as LayoutSkeleton } from '../skeleton/Layout'
import { Main } from './Main'

const defaultLinks = [
  {
    anchor: '#contenu',
    label: 'Aller au contenu de la page',
  },
]

export function Layout({ children }: PropsWithChildren) {
  const { survey } = useParams()
  const [header, setHeader] = useState<HeaderType | undefined>(undefined)
  const [footer, setFooter] = useState<FooterType | undefined>(undefined)

  const metadata = useMetadata(survey)

  useEffect(() => {
    if (metadata?.Header && metadata?.Footer) {
      setHeader(metadata.Header)
      setFooter(metadata.Footer)
    }
  }, [metadata])

  if (!header || !footer) {
    return <LayoutSkeleton />
  }

  return (
    <>
      <SkipLinks links={defaultLinks} />
      <Header header={header} />
      <Main id="contenu">{children}</Main>
      <Footer footer={footer} />
    </>
  )
}
