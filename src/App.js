import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import ListItems from './components/ListItems/ListItems';

function App() {

  const [data, setData] = useState([]);
  const [sortedCountry, setSortedCountry] = useState(false);

  const [value, setValue] = useState('');

  let filterCountries;

  const getCountryData = () =>{
    axios
    .get('https://date.nager.at/api/v3/AvailableCountries')
    .then((response) => {
      let mas_country = [];
      for (let i = 0; i < response.data.length; i++) {
        mas_country[i] = response.data[i].name + ":" + response.data[i].countryCode;
      }
      setData(mas_country);
    })
    .catch(error => console.log("Axios error: ", error));
  }

  useEffect(() => {
    getCountryData()
  }, [])

  if (!sortedCountry) {
    filterCountries = data.filter(country => {
      return country.toLowerCase().includes(value.toLowerCase())
    });
  } else {
    filterCountries = data.sort().filter(country => {
      return country.toLowerCase().includes(value.toLowerCase())
    });
  }

  const sort_country = () => {
    if(data.length!=0){
      setSortedCountry(true);
    }
  }

  const reset_settings=()=>{
    setData([]);
    setSortedCountry(false);
  }

  const listItems = filterCountries
    .map((country, index) => <ListItems items={country} key={index} />)


  return (
    <div className="App">
      <div className="container">
        <h1>React Test</h1>

        <div className="body">
          <div className="search-area">
            <section className="search-field" >
              <label for="search">Search text</label>
              <input id="search" type="text"
                onChange={(event) => setValue(event.target.value)} />

              <button title='By alphabetically' onClick={() => sort_country()}>
                Sort desc
              </button>
              <button onClick={()=> reset_settings()}>
                Reset
              </button>

              <button onClick={()=> getCountryData()}>
                Get Country
              </button>

            </section>
            {listItems}
          </div>

        </div>
      </div>


    </div>
  );
}

export default App;
