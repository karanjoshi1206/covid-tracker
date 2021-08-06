import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./infobox.css"
const Infobox = ({ title, cases, isRed, active, total, ...props }) => {
    return (
        <div>
            <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox-selected'} ${isRed && 'infoBox-red'} `}>
                <CardContent>
                    <Typography className="infoBox_title" color="textSecondary">{title}</Typography>
                    <h2 className={`infoBox_cases ${!isRed && 'infoBox-cases-green'}`}>{cases}</h2>
                    <Typography className="infoBox_total" color="textSecondary">{total}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Infobox
