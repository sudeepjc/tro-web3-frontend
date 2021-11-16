import React, { useState, useEffect } from 'react';
import { formatValue } from '../../utils/wrappers';
import useRecursiveTimeout from '../../utils/useRecursiveTimeout';

import secThree from '../../assets/images/hand-holding-usd-solid.svg';

const TROPriceCard = () => {
    const [TROPrice, setTROPrice] = useState('--');
    const [uError, setUError] = useState(null);

    const fetchTROPrice = () => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=trodl&vs_currencies=usd")
            .then(res => res.json())
            .then((result) => {
                setTROPrice(result.trodl.usd);
                setUError(null);
            },
                (err) => {
                    console.log(`Fetch TRO price failed. ${err.message}`);
                    setUError(err);
                }
            );
    }

    useEffect(() => {
        fetchTROPrice();
    });

    useRecursiveTimeout(() => {
        fetchTROPrice();
    }, 10000);

    const formatTROPrice = () => {
        return formatValue(uError, TROPrice, 4);
    }

    return (

        <div className="font-14 mlr-50">
            <span className="color-a8">    $TRO Price </span> <span className="semi-bold color-prim  ml-10">       {formatTROPrice()}</span>

        </div>
    );
}

export default TROPriceCard;