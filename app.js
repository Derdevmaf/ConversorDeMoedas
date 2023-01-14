const currencysOptionsContainer = document.querySelector('[data-js="currencys-options-container"]')
const firstCurrency = document.querySelector('[data-js="currency-one"]')
const secondCurrency = document.querySelector('[data-js="currency-two"]')
const amountToConvertContainer = document.querySelector('[data-js="currency-one-times"]')
const convertedValue = document.querySelector('[data-js="converted-value"]')
const conversionPrecision = document.querySelector('[data-js="conversion-precision"]')

const getConversionResult = (conversionTimes, result) => {
  const { text: currencyOneText } = firstCurrency[firstCurrency.selectedIndex]
  const { text: currencyTwoText } = secondCurrency[secondCurrency.selectedIndex]

  convertedValue.textContent = `${result.toFixed(2)}`
  conversionPrecision.textContent = `${conversionTimes} ${currencyOneText} = ${result} ${currencyTwoText}`
}

const startConversion = () => {
  const { value: times } = amountToConvertContainer
  const { value } = secondCurrency[secondCurrency.selectedIndex]

  getConversionResult(times, value * times)
}

const fetchCurrency = async mainCurrency => {
  const { conversion_rates } = await getCurrencyData(mainCurrency)
  const rates = Object.entries(conversion_rates)

  const currencyTwo = sessionStorage.getItem('currency-two') || 'BRL'

  const currencyData = rates.reduce((acc, [key, value]) => acc + `<option value=${value}>${key}</option>`, '')

  firstCurrency.innerHTML = currencyData
  secondCurrency.innerHTML = currencyData

  const getCurrency = Array.from(secondCurrency)
    .find(({ text }) => text === currencyTwo)
    .selected = true

  getCurrency()
  startConversion()
}

fetchCurrency('USD')

const convertFrom = event => {
  const mainCurrency = event.target.selectedIndex.text
  fetchCurrency(mainCurrency)
}

const convertTo = event => {
  const targetCurrency = event.target.selectedIndex.text
  sessionStorage.setItem('currency-two', targetCurrency)
  startConversion()
}

amountToConvertContainer.addEventListener('input', startConversion)
firstCurrency.addEventListener('change', convertFrom)
secondCurrency.addEventListener('change', convertTo)

