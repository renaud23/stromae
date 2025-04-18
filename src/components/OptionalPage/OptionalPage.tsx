import { useEffect, useState } from 'react'

import { fr } from '@codegouvfr/react-dsfr'
import { useNavigate, useParams } from 'react-router'

import { useMetadata } from '../../hooks/useMetadata'
import { uri404 } from '../../lib/domainUri'
import {
  type AcceptedElements,
  OptionalPageElementsEnum,
} from '../../typeStromae/type'
import { Link } from './elements/Link'
import { List } from './elements/List'
import { Section } from './elements/Section'
import { Title } from './elements/Title'

export function createPageElement(element: AcceptedElements, altId: string) {
  const { type, id } = element

  switch (type) {
    case OptionalPageElementsEnum.Link:
      return <Link key={id ?? altId} {...element} />
    case OptionalPageElementsEnum.Title:
      return <Title key={id ?? altId} {...element} />
    case OptionalPageElementsEnum.List:
      return <List key={id ?? altId} {...element} />
    case OptionalPageElementsEnum.Section:
      return <Section key={id ?? altId} {...element} />
    default:
      return <></>
  }
}

function createContent(content?: Array<AcceptedElements>) {
  if (!content) {
    return []
  }
  return content.reduce<any>((acc, element, index) => {
    return [...acc, createPageElement(element, `element-${index}`)]
  }, [])
}

export function OptionalPage({ name }: { name?: string }) {
  const { survey } = useParams()
  const [content, setContent] = useState<Array<AcceptedElements>>([])
  const metadata = useMetadata(survey)
  const navigate = useNavigate()

  useEffect(() => {
    if (name && metadata) {
      if (name in metadata?.optionalPages) {
        setContent(metadata.optionalPages[name])
      } else {
        navigate(uri404())
      }
    }
  }, [name, metadata, navigate])

  const body = createContent(content)

  return (
    <div
      className={fr.cx('fr-col-lg-6', 'fr-col-md-9', 'fr-col-11', 'fr-m-10v')}
    >
      {body}
    </div>
  )
}
