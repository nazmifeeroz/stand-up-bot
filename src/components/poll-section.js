import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from 'react-apollo'
import { GET_POLLS } from '../services/graphql/queries'
import { NEW_POLL } from '../services/graphql/mutations'

const PollSection = () => {
  useEffect(() => {
    window.M.AutoInit()
  }, [])
  return (
    <>
      <FlexContainer>
        <h5>Polls</h5>
        <a className="waves-effect btn-flat modal-trigger" href="#newPoll">
          <span className="new badge" data-badge-caption="">
            Create Poll
          </span>
        </a>
      </FlexContainer>
      <PollList />
      <PollModal />
    </>
  )
}

const PollList = () => {
  const today = new Date().toISOString().slice(0, 10)
  const pollsData = useQuery(GET_POLLS, {
    variables: { today },
  })

  // const pollsData = {
  //   data: {
  //     polls: [
  //       {
  //         id: 2,
  //         title: 'new poll desc',
  //         description: 'some description about poll',
  //         options: {
  //           'option 1': ['me', 'you'],
  //           'option 2': ['him', 'her'],
  //         },
  //       },
  //     ],
  //   },
  // }
  console.log('ppollsData', pollsData)
  // console.log('actualPollsData', actualPollsData)
  if (!pollsData || pollsData.loading) return null
  return (
    pollsData.data.polls.length > 0 && (
      <div className="row">
        {pollsData.data.polls.map((poll, i) => (
          <div className="col s12 m6" key={`poll-${i}`}>
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{poll.title}</span>
                <p>{poll.description}</p>

                <ResultsContainer>
                  {Object.keys(poll.options).map((opt, i) => (
                    <ul
                      className="collection with-header black-text teal"
                      key={`opt-${i}`}
                    >
                      <li className="collection-header">
                        <h5>opt</h5>
                      </li>
                      {poll.options[opt].map((votee, i) => (
                        <li className="collection-item" key={`votee-${i}`}>
                          {votee}
                        </li>
                      ))}
                    </ul>
                  ))}
                </ResultsContainer>
              </div>
              <div className="card-action">
                {Object.keys(poll.options).map((opt, i) => (
                  <VoteButton
                    className="pink waves-effect btn-large"
                    key={`opt-${i}`}
                  >
                    {opt}
                  </VoteButton>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  )
}

const PollModal = () => {
  const newPollData = {
    title: '',
    description: '',
    options: [],
  }

  const [pollData, setPollData] = useState(newPollData)
  const [newPoll] = useMutation(NEW_POLL)

  const handleSubmit = () => {
    // pollData.options = pollData.options.map(opt => ({ [opt]: [] }))
    let newOptions = {}
    pollData.options.forEach(key => (newOptions[key] = []))
    pollData.options = newOptions
    console.log('pollData', pollData)
    newPoll({ variables: { ...pollData } })
    setPollData(newPollData)
  }

  return (
    <div id="newPoll" className="modal">
      <div className="modal-content">
        <h4>Create a new Poll</h4>
        <div className="row">
          <div className="input-field">
            <input
              id="poll_title"
              value={pollData.title}
              onChange={e =>
                setPollData({ ...pollData, title: e.target.value })
              }
              type="text"
              className="validate"
            />
            <label htmlFor="poll_title">Poll Title</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              id="poll_description"
              value={pollData.description}
              onChange={e =>
                setPollData({ ...pollData, description: e.target.value })
              }
              type="text"
              className="validate"
            />
            <label htmlFor="poll_description">Poll Description</label>
          </div>
        </div>
        {pollData.options.map((opt, i) => (
          <div className="input-field" key={`opt-${i}`}>
            <input
              id="option"
              value={opt}
              onChange={e => {
                pollData.options[i] = e.target.value
                setPollData({ ...pollData })
              }}
              type="text"
              className="validate"
            />
            <label htmlFor="option">Enter new option</label>
          </div>
        ))}
        <button
          className="wave-effect teal btn-small"
          onClick={() => {
            pollData.options.push('')
            setPollData({ ...pollData })
          }}
        >
          New Option
        </button>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={handleSubmit}
          className="modal-close waves-effect waves-green btn-flat"
        >
          Create Poll
        </a>
      </div>
    </div>
  )
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ResultsContainer = styled(FlexContainer)`
  justify-content: space-around;
`

const VoteButton = styled.button`
  margin-right: 10px;
`

export default PollSection
