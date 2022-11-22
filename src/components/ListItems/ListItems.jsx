import React from "react";
import "./ListItems.css";
import axios from 'axios';
import { useState } from "react";
import ModalInfo from "../ModalWindow/ModalInfo";

const ListItems = (props) => {

    let country_name = props.items.split(":");
    const [holidays, setHolidays] = useState([]);
    const [isOpenInfo, setOpenInfo] = useState(false);

    const CountryHolidays = () => {

        axios
            .get(`https://date.nager.at/api/v3/NextPublicHolidays/${country_name[1]}`)
            .then((response) => {
                let mas_holidays = [];
                for (let i = 0; i < response.data.length; i++) {
                    mas_holidays[i] = response.data[i].name;
                }
                setHolidays(mas_holidays);
                console.log("Holidays: ", mas_holidays);
            })
            .catch(error => console.log("Axios error: ", error));

        setOpenInfo(true);
    }

    return (
        <div>
            <div className="container__items" onClick={ev => CountryHolidays()}>
                {country_name[0]}
            </div>
            <ModalInfo isOpenInfo={isOpenInfo}
                setOpenInfo={setOpenInfo}
                holidays={holidays}
                country={country_name[0]}
            />
        </div>

    )
}

export default ListItems;