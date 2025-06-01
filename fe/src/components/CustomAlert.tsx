import { Alert, AlertProps } from '@mui/material'
import { forwardRef } from 'react'

export const CustomAlert = forwardRef<HTMLDivElement, AlertProps>(function CustomAlert(props, ref) {
  return <Alert ref={ref} variant='outlined' sx={{ mb: 2 }} {...props} />
})
