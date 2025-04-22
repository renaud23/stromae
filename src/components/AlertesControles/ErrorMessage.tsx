import type { ReactNode } from 'react'

export function ErrorMessage({ errorMessage }: { errorMessage: ReactNode }) {
  if (errorMessage && Array.isArray(errorMessage)) {
    return (
      <div className="message-error" id="alertText">
        {errorMessage.map((message, i) => {
          return <p key={i}>{message}</p>
        })}
      </div>
    )
  }
  return <>{errorMessage}</>
}
