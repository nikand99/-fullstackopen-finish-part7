const Country = ({ country }) => {
    if (!country || country === null || country === undefined) {
        return
    }
    // console.log('country', country)
    if (!country.name) {
        return (
            <div>
            not found...
            </div>
        )
    }

    return (
      <div>
        <h3>{country.name.common} </h3>
        <div>capital {country.capital[0]} </div>
        <div>population {country.population}</div> 
        <img src={country.flags.svg} height='100' alt={`flag of ${country.name.common}`}/>  
      </div>
    )
  }

  export default Country
