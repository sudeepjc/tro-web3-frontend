import React, { useState, useEffect } from 'react';

import secThree from '../../assets/images/hand-holding-usd-solid.svg';
import { convertThousands } from '../../utils/wrappers';

const TROPriceCard = () => {
    const [TROPrice, setTROPrice] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch("https://api.coingecko.com/api/v3/simple/price?ids=trodl&vs_currencies=usd")
            .then(res => res.json())
            .then((result) => {
                // console.log(result.trodl.usd);
                setTROPrice(result.trodl.usd);
            },
                (error) => {
                    setError(error);
                })
    });

    if (error) {
        return (
            <div className="col-3 card-sec card-height1">
                <div className="mt-30">
                    <img src={secThree} className="sec-imgs" alt='sec-three'></img>
                </div>
                <div className="mtb18">
                    $TRO Price
                </div>
                <div className="col-theme">
                    loading...
                </div>
            </div>
        );
    } else {
        return (
            <div className="col-3 card-sec card-height1">
                <div className="mt-30">
                    <img src={secThree} className="sec-imgs" alt='sec-three'></img>
                </div>
                <div className="mtb18">
                    $TRO Price
                </div>
                <div className="col-theme">
                    {convertThousands(TROPrice)}
                </div>
            </div>
        );
    }
}

export default TROPriceCard;