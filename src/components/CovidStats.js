import React, {useEffect} from 'react'
import styled, {css} from 'styled-components'
import useCovidStats from '../services/useCovidStats'

const CovidStats = ({send}) => {
  const {loading, sgStats, globalStats} = useCovidStats()

  useEffect(() => {
    if (!loading) send('SAVE_COVID_STATS', {sgStats, globalStats})
  }, [loading, sgStats, globalStats, send])

  return (
    <CovidWrapper>
      <StyledStatsBlock>
        <b>Singapore Covid Information</b>
        {loading ? (
          <LazyDiv width="180" />
        ) : (
          <>
            <br />
            Total Cases: {sgStats.cases}
          </>
        )}
        {loading ? (
          <LazyDiv width="250" />
        ) : (
          <>
            <br />
            Yesterday: {sgStats.yesterdayCases} | Active: {sgStats.active}
          </>
        )}
        {loading ? (
          <LazyDiv width="350" />
        ) : (
          <>
            <br />
            Deaths: {sgStats.deaths} | Recovered: {sgStats.recovered} |
            Critical: {sgStats.critical}
          </>
        )}
      </StyledStatsBlock>
      <StyledStatsBlock flexEnd>
        <b>Global Covid Information</b>
        {loading ? (
          <>
            <LazyDiv width="120" />
            <LazyDiv width="100" />
            <LazyDiv width="150" />
          </>
        ) : (
          <div>
            Cases: {globalStats.cases} <br /> Deaths: {globalStats.deaths}{' '}
            <br />
            Recovered: {globalStats.recovered}
          </div>
        )}
      </StyledStatsBlock>
    </CovidWrapper>
  )
}

const StyledStatsBlock = styled.div`
  ${props =>
    props.flexEnd &&
    css`
      @media only screen and (min-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
      }
    `}
  margin-bottom: 10px;
`

const CovidWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 100px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`

const LazyDiv = styled.div`
  height: 18px;
  width: ${props => props.width || '100'}px;
  margin-top: 3px;
  background-color: grey;

  animation: blinking 1s infinite;
  animation-fill-mode: both;
  animation-delay: 0.5s;
  position: relative;
  animation-direction: alternate;
  animation-name: blinking;
  animation-fill-mode: both;
  animation-duration: 0.4s;
  animation-direction: alternate;

  @keyframes blinking {
    from {
      opacity: 0.1;
    }
    to {
      opacity: 0.5;
    }
  }
`

export default CovidStats
