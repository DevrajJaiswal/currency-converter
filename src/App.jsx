import { useState } from 'react'
import useCurrencyInfo from './custom-hooks/useCurrencyInfo'
import InputBox from './components'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0.00)
  const [from, setFrom] = useState('inr')
  const [to, setTo] = useState('usd')
  const [convertedAmount, setConvertedAmount] = useState(0.00)

  // Custom Currency hook
  const [currencyInfo, setCurrencyInfo] = useCurrencyInfo(from)
  const currencyOptions = Object.keys(currencyInfo);

  const swap = function () {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convertAmount = function () {
    setConvertedAmount(amount * Number(currencyInfo[to]))
  }

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/89485/pexels-photo-89485.jpeg')`,
          color: 'black'
        }}
      >
        <div className="w-full">
          <h2 className="wrapper mb-4 text-2xl font-bold">Currency Converter</h2>

          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convertAmount()
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  from={from}
                  amount={amount}
                  currencyOptions={currencyOptions}
                  onCurrencyChange={function (currency) {
                    return setFrom(currency)
                  }}
                  selectCurrency={from}
                  onAmountChange={function (amount) {
                    return setAmount(amount);
                  }}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-black px-2 py-0.5"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  to={to}
                  amount={convertedAmount}
                  currencyOptions={currencyOptions}
                  onCurrencyChange={function (currency) {
                    return setTo(currency)
                  }}
                  selectCurrency={from}
                  amountDisable
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-black px-4 py-3 rounded-lg">
                Convert  {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div >
    </>);
}

export default App
