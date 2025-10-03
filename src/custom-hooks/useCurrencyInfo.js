import { useEffect, useState } from "react";

function useCurrencyInfo(currencyCode) {
    const [data, setData] = useState({});
    useEffect(function () {

        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.json`)
            .then(function (res) { return res.json() })
            .then(function (res) { return setData(res[currencyCode]) });
    }, [currencyCode])
    return [data, useCurrencyInfo];
}

export default useCurrencyInfo;