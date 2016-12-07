import React from 'react';
import {Link} from 'react-router';

export default function (props) {

  const stations = props.stations;

 
  return (
    <div>
      <h3>Stations</h3>
      <div className="list-group">
      {
        Object.keys(stations).map(station => {
          return (
            <div className="list-group-item" key={station}>
              <Link to={`/stations/${station}`}>{station}</Link>
            </div>
          );
        })
      }
      </div>
    </div>
  );
};
