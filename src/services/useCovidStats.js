import React from 'react'

const useCovidStats = () => {
  const [loading, setLoading] = React.useState(true)
  const [stats, setStats] = React.useState()
  const [globalStats, setGlobalStats] = React.useState()

  React.useEffect(() => {
    const fetchSgData = async () => {
      const data = await fetch(
        'https://coronavirus-19-api.herokuapp.com/countries/singapore',
      ).then(resp => resp.json())

      const { yesterdayCases } = await fetch(
        'https://next-standup-bot.now.sh/api/yesterday-cases',
      ).then(resp => resp.json())

      setStats({ ...data, yesterdayCases })
    }

    const fetchGlobalData = async () => {
      const data = await fetch(
        'https://coronavirus-19-api.herokuapp.com/all',
      ).then(resp => resp.json())

      setGlobalStats(data)
    }

    fetchSgData().then(() => fetchGlobalData().then(() => setLoading(false)))
  }, [])

  return { stats, globalStats, loading }
}

export default useCovidStats
