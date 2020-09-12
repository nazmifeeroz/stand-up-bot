import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from 'react-apollo'
import { GET_POLLS } from '../services/graphql/queries'
import {
  INSERT_POLL,
  UPDATE_POLL,
  DELETE_POLL,
} from '../services/graphql/mutations'
import { NEW_POLL } from '../services/graphql/subscriptions'
import { StoreContext } from '../services/store'

const PollSection = () => {
  useEffect(() => {
    window.M.AutoInit()
  }, [])
  return (
    <>
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
  const [updatePoll] = useMutation(UPDATE_POLL)
  const [deletePoll] = useMutation(DELETE_POLL)
  const { name, setPollsData } = useContext(StoreContext)

  useEffect(() => {
    setPollsData(pollsData)
  }, [pollsData, setPollsData])

  if (!pollsData || pollsData.loading) return null

  pollsData.subscribeToMore({
    document: NEW_POLL,
    variables: { today },
    updateQuery: (prev, { subscriptionData }) => {
      return Object.assign({}, prev, {
        polls: subscriptionData.data['polls'],
      })
    },
  })

  const handleVote = ({ poll: { id, options }, option }) => {
    Object.keys(options).forEach(opt => {
      options[opt] = options[opt].filter(votee => votee !== name)
    })
    options[option].push(name)
    updatePoll({
      variables: { pollId: id, editedOptions: options },
    }).catch(err => console.log('err', err))
  }

  const handleDeletePoll = pollId => {
    const confirmDelete = window.confirm(
      'Are you sure you wish to delete this poll?'
    )
    if (confirmDelete) deletePoll({ variables: { pollId } })
  }

  return (
    pollsData.data.polls.length > 0 && (
      <>
        <FlexContainer>
          <h5>Polls</h5>
          <a className="waves-effect btn-flat modal-trigger" href="#newPoll">
            <span className="new badge" data-badge-caption="">
              Create Poll
            </span>
          </a>
        </FlexContainer>
        <div className="row">
          {pollsData.data.polls.map((poll, i) => (
            <div className="col s12 m6" key={`poll-${i}`}>
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <PollHeader>
                    <span className="card-title">{poll.title}</span>
                    <button
                      onClick={() => handleDeletePoll(poll.id)}
                      className="btn-floating btn-small waves-effect waves-light red"
                    >
                      <i className="material-icons">close</i>
                    </button>
                  </PollHeader>
                  <p>{poll.description}</p>

                  <ResultsContainer>
                    {Object.keys(poll.options).map((opt, i) => (
                      <ul
                        className="collection with-header black-text teal"
                        key={`opt-${i}`}
                      >
                        <li className="collection-header deep-purple">
                          <small className="white-text">{opt}</small>
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
                      className="pink waves-effect btn-small"
                      key={`opt-${i}`}
                      onClick={() => handleVote({ poll, option: opt })}
                    >
                      {opt}
                    </VoteButton>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  )
}

const PollModal = () => {
  const initialPollData = {
    title: '',
    description: '',
    options: [''],
  }

  const [pollData, setPollData] = useState(initialPollData)
  const [insertPoll] = useMutation(INSERT_POLL)

  const handleSubmit = () => {
    let newOptions = {}
    pollData.options.forEach(key => (newOptions[key] = []))
    pollData.options = newOptions
    insertPoll({ variables: { ...pollData } })
    setPollData(initialPollData)
  }

  const isInvalid =
    pollData.title === '' ||
    pollData.description === '' ||
    pollData.options.length < 2

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
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  pollData.options.push('')
                  setPollData({ ...pollData })
                }
              }}
            />
            <label htmlFor="option">Enter option {i + 1}</label>
          </div>
        ))}
        <small>Press Enter for next option</small>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={handleSubmit}
          className="modal-close waves-effect waves-green btn-flat"
          disabled={isInvalid}
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
  align-items: flex-start;
`

const VoteButton = styled.button`
  margin-right: 10px;
`

const PollHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export default PollSection
