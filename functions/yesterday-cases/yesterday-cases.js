const cheerio = require('cheerio')
const fetch = require('node-fetch')

exports.handler = async (_, _event, callback) => {
  let response

  try {
    const resp = await fetch('https://www.worldometers.info/coronavirus/')
    response = await resp.text()
  } catch (err) {
    return {
      statusCode: 400,
      body: {
        error: err,
      },
    }
  }

  // to store parsed data
  const result = []

  // // get HTML and parse death rates
  const html = cheerio.load(response)

  const countriesTable = html('table#main_table_countries_yesterday')
  const countriesTableCells = countriesTable
    .children('tbody')
    .children('tr:not(.row_continent)')
    .children('td')

  // // count worldometers table columns
  const colCount = html('table#main_table_countries_yesterday th').length

  const totalColumns = colCount
  const countryColIndex = 1
  const yesterdayCasesColIndex = 3

  // minus totalColumns to skip last row, which is total
  for (let i = 0; i < countriesTableCells.length - totalColumns; i += 1) {
    const cell = countriesTableCells[i]

    // get country
    if (i % totalColumns === countryColIndex) {
      let country =
        cell.children[0].data ||
        cell.children[0].children[0].data ||
        // country name with link has another level
        cell.children[0].children[0].children[0].data ||
        cell.children[0].children[0].children[0].children[0].data ||
        ''
      country = country.trim()
      if (country.length === 0) {
        // parse with hyperlink
        country =
          (cell.children[0].next.children[0] &&
            cell.children[0].next.children[0].data) ||
          ''
      }
      result.push({country: country.trim() || ''})
    }
    // get yesterday cases
    if (i % totalColumns === yesterdayCasesColIndex) {
      const cases = cell.children.length !== 0 ? cell.children[0].data : ''
      result[result.length - 1].yesterdayCases = parseInt(
        cases.trim().replace(/,/g, '') || '0',
        10,
      )
    }
  }

  const sgYestStat = result.find(c => c.country === 'Singapore')

  const body = JSON.stringify({yesterdayCases: sgYestStat.yesterdayCases})
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  }

  callback(null, {
    headers,
    statusCode: 200,
    body,
  })

  return
}
