import React from 'react';
import './InfoBox.css';
// Typography --> fancy way to write (text style)
// CardContent --> nice white clean background for card which is basically used to make card float
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    //   adding clickable functionality to the card by passing onClick func to the card through props
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && 'infoBox--selected'} ${
        isRed && 'infoBox--red'
      } `} // (--) here stands for modification
    >
      <CardContent>
        {/* Title */}
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>

        {/* Number of cases */}
        <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
          {cases}
        </h2>

        {/* total cases */}
        <Typography className='infoBox__total' color='textSecondary'>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
