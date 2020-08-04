import React from 'react'

const useCovidStats = () => {
  const [covidAPI, setCovidAPI] = React.useState({
    loading: true,
  })

  React.useEffect(() => {
    const fetchSgData = async () => {
      const todayAllStats = await fetch(
        'https://coronavirus-19-api.herokuapp.com/countries/singapore',
      ).then(resp => resp.json())

      const {yesterdayCases} = await fetch(
        'https://next-standup-bot.now.sh/api/yesterday-cases',
      ).then(resp => resp.json())

      return {...todayAllStats, yesterdayCases}
    }

    const fetchGlobalData = async () => {
      return await fetch(
        'https://coronavirus-19-api.herokuapp.com/all',
      ).then(resp => resp.json())
    }

    Promise.all([fetchSgData(), fetchGlobalData()]).then(covidStats => {
      setCovidAPI({
        sgStats: covidStats[0],
        globalStats: covidStats[1],
        loading: false,
      })
    })
  }, [])

  return covidAPI
}

export default useCovidStats
