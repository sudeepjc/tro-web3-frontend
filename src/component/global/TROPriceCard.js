import React, { useState, useEffect } from 'react';
import { formatValue, convertThousands } from '../../utils/wrappers';
import useRecursiveTimeout from '../../utils/useRecursiveTimeout';

const TROPriceCard = () => {
    const [TROPrice, setTROPrice] = useState({price: '--',change: 0});
    const [uError, setUError] = useState(null);

    const fetchTROPrice = () => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=trodl&vs_currencies=usd&include_24hr_change=true")
            .then(res => res.json())
            .then((result) => {
                setTROPrice({price: result.trodl.usd, change: parseFloat(result.trodl.usd_24h_change)});
                setUError(null);
                // console.log(result);
            },
                (err) => {
                    console.log(`Fetch TRO price failed. ${err.message}`);
                    setUError(err);
                }
            );
    }

    useEffect(() => {
        fetchTROPrice();
    },[uError]);

    useRecursiveTimeout(() => {
        fetchTROPrice();
    }, 10000);

    const formatTROPrice = () => {
        let value = formatValue(uError, TROPrice.price, 4);
        if(value !== '--') {
            return '$' + value
        } else {
            return value;
        }
    }
    
    const format24HrChange = () => {
        return convertThousands( TROPrice.change, 2);
    }

    return (
        <div className="font-14">
            <span className="color-a8">    TRO Price </span> <span className="semi-bold color-prim  ml-10"> {formatTROPrice()}
            </span>
            <span className='ml-10'>
                <i className={TROPrice.change <= 0 ? 'fas fa-caret-down red-crate' : 'fas fa-caret-up green-crate'}></i>
                <span className={TROPrice.change <= 0 ? 'red-crate ml-5' : 'green-crate ml-5'}>{format24HrChange()}%</span>
            </span>
        </div>
    );
}

export default TROPriceCard;