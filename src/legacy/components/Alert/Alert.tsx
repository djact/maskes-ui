import React from 'react'
import { Alert as AlertBS } from 'react-bootstrap'
import './Alert.css'
interface IAlert {
    id: string
    msg: string
    variant:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'dark'
        | 'light'
        | undefined
}
const Alert = ({ alerts }: { alerts: IAlert[] }) => {
    return alerts && alerts.length && alerts.length > 0
        ? alerts.map((alert) => (
              <AlertBS
                  className="my-alert"
                  key={alert.id}
                  variant={alert.variant}
              >
                  {alert.msg}
              </AlertBS>
          ))
        : null
}
export default Alert
