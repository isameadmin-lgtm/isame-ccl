'use client'

import { useRowLabel } from '@payloadcms/ui'

type NavItem = {
  label: string
  url?: string | null
  newTab?: boolean | null
  id?: string | null
}

export const RowLabel = () => {
  const data = useRowLabel<NavItem>()

  const label = data?.data?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.label}`
    : 'Row'

  return <span>{label}</span>
}

export default RowLabel
