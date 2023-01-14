const APIKey = '3831f1d112ccec4e26008713'
const getURL = mainCurrency => `https://v6.exchangerate-api.com/v6/${APIKey}latest/${mainCurrency}`

const fetchData = async url => {
  try {
    const response = await fetch(url)

    if(!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }
    return response.json()
  } catch (error) {
    alert(error.message)
  }
}
const getCurrencyData = mainCurrency => fetchData(getURL(mainCurrency))