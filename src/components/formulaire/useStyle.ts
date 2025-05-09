import { makeStyles } from '@codegouvfr/react-dsfr/tss'

export const useStyles = makeStyles()({
  root: {
    '.lunatic-component-with-dsfr': {
      marginBottom: '1rem',
      '.fr-fieldset, .fr-fieldset__element': {
        marginBottom: 0,
      },
      '.pairwise-link': {
        marginBottom: '1rem',
      },
      "input[aria-describedby^='autre-link']": {
        marginBottom: '1rem',
      },
      legend: {
        fontSize: '1.75rem',
        lineHeight: '2.25rem',
        paddingBottom: '1rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        marginLeft: '-0.25rem',
        marginRight: '-0.25rem',
        fontWeight: '700 !important',
        color: 'var(--text-label-grey)',
        fontFamily: 'Marianne',
      },
      '.fr-label': {
        fontFamily: 'Marianne',
        display: 'block',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        color: 'var(--text-label-grey)',
        fontWeight: '400',
      },
      '.lunatic-dsfr-component-set .lunatic-dsfr-radio legend, .lunatic-dsfr-component-set .checkbox-lunatic-dsfr legend, .datepicker-lunatic-dsfr legend':
        {
          display: 'flex',
          flexDirection: 'column',
          fontSize: '1rem',
          lineHeight: '2.25rem',
          paddingBottom: '1rem',
          paddingLeft: '0.75rem',
          paddingRight: '0.75rem',
          marginLeft: '-0.25rem',
          marginRight: '-0.25rem',
          fontWeight: '400',
        },
      '.datepicker-lunatic-dsfr legend': {
        fontWeight: '700',
      },
    },
    '.lunatic-dsfr-component-set': {
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '1rem',
      '.fr-callout': {
        marginBottom: '0',
      },
      '.lunatic-dsfr-component-set-component': {
        width: '100%',
      },
      '.lunatic-dsfr-component-set': {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      },
    },
  },
})
