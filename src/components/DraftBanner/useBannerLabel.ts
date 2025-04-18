import { useEffect, useState } from 'react'

import { useParams } from 'react-router'

import { surveyApi } from '../../lib/surveys'
import { type PersonalizationElement } from '../../typeStromae/type'
import { useLunaticContext } from '../orchestrator/useLunaticContext'

function parseLabel(value: string | number | boolean | string[]) {
  if (Array.isArray(value)) {
    return value.join(' ')
  }
  return `${value ?? ''}`
}

function parseDependencies(value: string | number | boolean | string[]) {
  if (Array.isArray(value)) {
    return []
  }
  return []
}

function parsePersonalization(perzonalization: Array<PersonalizationElement>) {
  const result = { label: '', dependencies: [] }

  perzonalization.forEach(({ name, value }) => {
    if (name === 'bannerLabel') {
      result.label = parseLabel(value)
    } else if (name === 'bannerLabelDependencies') {
      result.dependencies = parseDependencies(value)
    }
  })

  return result
}

export function useBannerLabel() {
  const { unit } = useParams()
  const { personalization, currentChange } = useLunaticContext()
  const [bannerLabel, setBannerLabel] = useState('')
  const [bannerDependencies, setBannerDependencies] = useState<Array<string>>(
    [],
  )

  useEffect(() => {
    if (personalization) {
      const { label, dependencies } = parsePersonalization(personalization)
      setBannerLabel(label)
      setBannerDependencies(dependencies)
    }
  }, [personalization])

  useEffect(() => {
    if (
      currentChange &&
      unit &&
      bannerDependencies.indexOf(currentChange.name) !== -1
    ) {
      ;(async () => {
        const updatedSUData = await surveyApi.getSurveyUnitData(unit)
        const { label } = parsePersonalization(
          updatedSUData?.personalization ?? [],
        )
        setBannerLabel(label)
      })()
    }
  }, [bannerDependencies, currentChange, unit])

  return bannerLabel
}
