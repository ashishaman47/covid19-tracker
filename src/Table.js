import React from 'react';
import './Table.css';
import numeral from 'numeral';

function Table({ countries, casesType }) {
  switch (casesType) {
    case 'cases':
      return (
        <div className='table'>
          {/* map through all the countries for every single country return the following */}
          {/* destructring each country */}

          {countries.map(({ country, cases }) => (
            <tr>
              {/* Emmet --> tr>td*2 */}
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format(',')}</strong>
              </td>
            </tr>
          ))}
        </div>
      );
    case 'recovered':
      return (
        <div className='table'>
          {/* map through all the countries for every single country return the following */}
          {/* destructring each country */}

          {countries.map(({ country, recovered }) => (
            <tr>
              {/* Emmet --> tr>td*2 */}
              <td>{country}</td>
              <td>
                <strong>{numeral(recovered).format(',')}</strong>
              </td>
            </tr>
          ))}
        </div>
      );
    case 'deaths':
      return (
        <div className='table'>
          {/* map through all the countries for every single country return the following */}
          {/* destructring each country */}

          {countries.map(({ country, deaths }) => (
            <tr>
              {/* Emmet --> tr>td*2 */}
              <td>{country}</td>
              <td>
                <strong>{numeral(deaths).format(',')}</strong>
              </td>
            </tr>
          ))}
        </div>
      );
  }
}

export default Table;
