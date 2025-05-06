import { useCallback, useRef, useState } from 'react'

import { surveyApi } from '../../../lib/surveys'
import { CollectStatusEnum } from '../../../typeStromae/type'
import type { SavingFailure } from '../../../typeStromae/type'
import type { UseLunaticType } from './useOrchestratorContext'

type CollectedType = Pick<ReturnType<UseLunaticType['getData']>, 'COLLECTED'>

function getCollectStatus(changing: boolean, previous: CollectStatusEnum) {
  if (previous === CollectStatusEnum.Validated) {
    return CollectStatusEnum.Validated
  }
  if (changing) {
    return CollectStatusEnum.Completed
  }

  return previous
}

type useSavingArgs = {
  setWaiting: (w: boolean) => void
  setFailure: (s?: SavingFailure) => void
  initialCollectStatus: CollectStatusEnum
  unit: string
}

export function useSaving({
  setWaiting,
  setFailure,
  initialCollectStatus,
  unit,
}: useSavingArgs) {
  const [currentStatus, setCurrentStatus] = useState(initialCollectStatus)
  const changes = useRef<Map<string, unknown>>(new Map())

  const listenChange = useCallback((componentName: string, value: unknown) => {
    changes.current.set(componentName, value)
  }, [])

  const saveChange = useCallback(
    async ({
      pageTag,
      getData,
    }: {
      pageTag: UseLunaticType['pageTag']
      getData: UseLunaticType['getData']
    }) => {
      setFailure(undefined)
      setWaiting(true)
      try {
        // save data
        const isOnChange = changes.current.size !== 0
        if (isOnChange) {
          const lunaticValues = getData(false)?.COLLECTED ?? {}

          const payload = Object.entries(
            Object.fromEntries(changes.current),
          ).reduce((acc, [name]) => {
            if (name in lunaticValues) {
              return {
                ...acc,
                [name]:
                  (
                    lunaticValues[
                      name as keyof object
                    ] as unknown as CollectedType
                  )?.COLLECTED ?? null,
              }
            }
            return acc
          }, {})
          await surveyApi.putSurveyUnitData(payload, unit)
          setFailure({ status: 200 })

          const keys = Array.from(changes.current.keys())
          for (const variable of keys) {
            changes.current.delete(variable)
          }
        }
        // save stateData
        const state = getCollectStatus(isOnChange, currentStatus)
        await surveyApi.putSurveyUnitStateData(
          {
            currentPage: pageTag,
            state,
            date: new Date().getTime(),
          },
          unit,
        )
        setCurrentStatus(state)
        setWaiting(false)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setFailure({ status: 500 })
        setWaiting(false)
      }
    },
    [currentStatus, setFailure, setWaiting, unit],
  )

  return { listenChange, saveChange }
}
