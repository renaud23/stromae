import { lunaticVersion, stromaeVersion } from '../../utils/app'

export const AppVersion = ({
  className,
  appSupplementaire,
}: {
  className: string
  appSupplementaire?: string
}) => {
  return (
    <span
      className={className}
    >{`Stromae : ${stromaeVersion} | Lunatic : ${lunaticVersion}${appSupplementaire ?? ''}`}</span>
  )
}
