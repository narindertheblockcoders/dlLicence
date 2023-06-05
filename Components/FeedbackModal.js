import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FeedbackModal = (props) => {

  const [feedback, setFeedback] = useState()

  useEffect(() => {
    if (props) {
      setFeedback(props?.props?.message)
    }
  })
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" id="client-dialog">
          <div className="modal-content">
            <div className="modal-header" id="client-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
              >
                Feedback
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body" id="client-body">
              <span>
                {feedback}

              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal