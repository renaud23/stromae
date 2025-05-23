import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import classnames from 'classnames'

import { type TitleElement } from '../../../typeStromae/type'
import { useDocumentTitle } from '../../../utils/useDocumentTitle'

export function Title(props: TitleElement) {
  const { title, id, className } = props
  useDocumentTitle(title)
  return (
    <div>
      <Breadcrumb
        currentPageLabel={title}
        homeLinkProps={{
          to: '/',
        }}
        segments={[]}
      />
      <h2 id={id} className={classnames(className)}>
        {title}
      </h2>
    </div>
  )
}
