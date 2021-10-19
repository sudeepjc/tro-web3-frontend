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
                    // console.log(result.trodl.usd);
                    //DEBUG_LOG
                },
                (err) => {
                    setUError(err);
                    //PROD_LOG
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

    return(
        <div className="col-3 card-sec card-height1">
            <div className="mt-30">
                <img src={secThree} className="sec-imgs" alt='sec-three'></img>
            </div>
            <div className="mtb18">
                $TRO Price
            </div>
            <div className="col-theme">
                {formatTROPrice()}
            </div>
        </div>
    );
}

export default TROPriceCard;