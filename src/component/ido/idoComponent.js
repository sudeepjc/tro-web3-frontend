
import React, { useEffect, useState } from 'react';
import IdoDetails from '../ido/idoDetails'
import IdoCard from '../ido/idoCard'
import { poolsStatic } from './poolsStatic';
import DropDown from './dropDown';

const IdoComponent = ({ trodlIdo, accounts, web3 }) => {

    const [poolArray, setPoolArray] = useState([]);
    const [detailsBool, showDetails] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [dropdownSelect, setDropdownSelect] = useState("All");

    useEffect(() => {
        async function getPoolCount() {
            if (isValidConnectionForCard()) {
                try {
                    let count = await trodlIdo.methods.poolsCount().call({ from: accounts[0] });
                    console.log(`Pool count: ${count}`);
                    let arr = Array.from({ length: count }, (_, index) => count - (index + 1));
                    setPoolArray(arr);
                } catch (err) {
                    console.log(`Failed to get Pool count: ${err.message}`);
                }
            }
        }
        getPoolCount();
    }, [trodlIdo, accounts, web3, searchText, dropdownSelect]);

    const isValidConnectionForCard = () => {
        if ((trodlIdo && (trodlIdo._address !== null))
            && (accounts && accounts.length > 0) && web3) {
            return true;
        }
        return false;
    }

    const showDetailedView = (bool) => {
        showDetails(bool);
    }

    const onSearchChange = (event) => {
        setSearchText(event.target.value);
    }

    const onDropdownSelect = (selecttion) => {
        setDropdownSelect(selecttion);
    }

    const getFilteredPools = () => {

        let tempArray = poolArray.filter(poolId => {
            let result = poolsStatic.filter(pool => pool.poolId === poolId);
            return result[0].tokenName.toLowerCase().includes(searchText.toLowerCase());
        });

        return tempArray.map((item, index) => (
            < IdoCard key={index} poolId={item} trodlIdo={trodlIdo} accounts={accounts} web3={web3} selection={dropdownSelect} onDetailView={showDetailedView} />
        ));
    }

    return (
        <div className="mt-44  ">
            {detailsBool ?
                <div>
                    < div className="back-btn cursor-p flex-d" onClick={() => { showDetailedView(false) }}>
                        <div><i class="fas fa-arrow-left"></i>  </div>  <div className="ml-10">
                            Back </div>
                    </div >
                    <IdoDetails trodlIdo={trodlIdo} accounts={accounts} web3={web3} ></IdoDetails>
                </div> :
                <div>
                    <div className="ido_head bold">
                        Trodl IDO launchpad
                    </div>
                    <div className="ido_sub">
                        Build and Grow Your Portfolio by Accessing High-Potential, Vetted Projects!
                    </div>
                    <div className="flex-d mt-32">
                        <div className="banner-ido">
                            banner1
                        </div>
                        <div className="banner-ido">
                            banner2
                        </div>
                        <div className="banner-ido">
                            banner3
                        </div>
                    </div>
                    <div className="flex-d mt-35 ml-12">
                        <i className="fa fa-search search-icn" aria-hidden="true"></i>
                        <input className="ido-search" placeholder="Search by pool name here... " onChange={onSearchChange} />
                        <div className="ido-rigth">
                            <DropDown onSelection={onDropdownSelect} />
                        </div>
                    </div>
                    <hr className="mr-20"></hr>
                    <div className="row ml-3">
                        {getFilteredPools()}
                    </div>
                </div>
            }
        </div>
    )
}
export default IdoComponent;
