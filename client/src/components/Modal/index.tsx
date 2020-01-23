import * as React from 'react'
import Button from 'components/Button'

import './Modal.css'

type Props = {
  open: boolean;
  text: string;
  onOK: () => void;
  onClose: () => void;
}

export default function Modal(props: Props): React.ReactElement {
  const {
    open, text, onOK, onClose,
  } = props

  if (!open) return null

  return (
    <div className="modal-background">
      <div className="modal">
        <div className="modal-text">
          {text}
        </div>
        <div className="modal-actions">
          <Button color="primary" onClick={onOK}>
            OK
          </Button>
          <Button color="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
