import { makeStyles } from '@codegouvfr/react-dsfr/tss'

export const useStyles = makeStyles()({
  container: {
    borderBottom: '1px solid var(--border-default-grey)',
  },
  badgeContainer: {
    minWidth: 'fit-content',
  },
  addressRow: {
    '@media (min-width: 48em)': {
      flexDirection: 'row-reverse',
    },
  },
})
