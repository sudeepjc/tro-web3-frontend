import React, { useState } from 'react';

const DropDown = ({ onSelection }) => {
    const [selectValue, setSelectValue] = useState("All");
    const [cssClass, setCssClass] = useState("fas fa-circle dd-circle-all");
    const [dropBool, showDropdown] = useState(false);

    const onClickAll = () => {
        setSelectValue("All");
        onSelection("All");
        setCssClass("fas fa-circle dd-circle-all");
        showDropdown(false);
    }

    const onClickLive = () => {
        setSelectValue("Live");
        onSelection("Live");
        setCssClass("fas fa-circle dd-circle-live");
        showDropdown(false);
    }

    const onClickUpcoming = () => {
        setSelectValue("Upcoming");
        onSelection("Upcoming");
        setCssClass("fas fa-circle dd-circle-upcoming");
        showDropdown(false);
    }

    const onClickEnded = () => {
        setSelectValue("Ended");
        onSelection("Ended");
        setCssClass("fas fa-circle dd-circle-ended");
        showDropdown(false);
    }


    return (
        <div className="flex-d">
            <div className="stat">
                Status
            </div>
            <div className={dropBool ? 'dropdown show' : 'dropdown'} >
                <button className="btn btn-secondary dropdown-toggle status-dd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => {
                    dropBool ? showDropdown(false) : showDropdown(true)
                }}>
                    {selectValue} <i className={cssClass}></i>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={onClickAll}>All</a>
                    <a className="dropdown-item" onClick={onClickUpcoming}>UpComing</a>
                    <a className="dropdown-item" onClick={onClickLive}>Live</a>
                    <a className="dropdown-item" onClick={onClickEnded}>Ended</a>
                </div>
            </div>
        </div>

    )



}
export default DropDown