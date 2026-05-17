'use client'

import { useRowLabel } from '@payloadcms/ui'

export const RowLabel = () => {
  const data = useRowLabel<any>() // ← any

  const label = data?.data?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.label}`
    : 'Row'

  return <span>{label}</span>
}

export default RowLabel
