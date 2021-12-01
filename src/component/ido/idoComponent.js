
import React, { useEffect, useState } from 'react';
import IdoDetails from '../ido/idoDetails'
import IdoCard from '../ido/idoCard'
import { poolsStatic } from './poolsStaticMainnet';
import DropDown from './dropDown';
import { useDispatch } from 'react-redux';
import { setErrorModal } from '../../redux/actions/errorModalActions';
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.png';

const IdoComponent = (props) => {
    const dispatch = useDispatch();

    let { paymentToken, trodlIdo, accounts, web3, type, error, show, clickBanner } = props;

    if (error) {
        dispatch(setErrorModal(show, type, error.message))
    }

    const [poolArray, setPoolArray] = useState([]);
    const [detailsBool, showDetails] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [dropdownSelect, setDropdownSelect] = useState("All");
    const [detailPoolId, setDetailPoolId] = useState(0);

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

    const showDetailedView = (bool, poolId) => {
        showDetails(bool);
        setDetailPoolId(poolId);
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
        <div className="mt-44">
            {detailsBool ?
                <div>
                    <div className="back-btn cursor-p flex-d" onClick={() => { showDetailedView(false) }}>
                        <div><i className="fas fa-arrow-left"></i></div>
                        <div className="ml-10"> Back </div>
                    </div >
                    <IdoDetails poolId={detailPoolId} paymentToken={paymentToken} trodlIdo={trodlIdo} accounts={accounts} web3={web3} ></IdoDetails>
                </div> :
                <div>
                    <div className="ido_head bold">
                        Trodl IDO launchpad
                    </div>
                    <div className="ido_sub">
                        Build and Grow Your Portfolio by Accessing High-Potential, Vetted Projects!
                    </div>
                    <div className="flex-d mt-32">
                        <div className="banner-ido" onClick={()=> {clickBanner('staking')}}>
                            <img src={banner1} className="banner-ido-image" alt='right-img'></img>
                        </div>
                        <div className="banner-ido" onClick={()=> {clickBanner('staking')}}>
                            <img src={banner2} className="banner-ido-image" alt='right-img'></img>
                        </div>
                        <div className="banner-ido" onClick={()=> {clickBanner('staking')}}>
                        <img src={banner3} className="banner-ido-image" alt='right-img'></img>
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
