import React, { PureComponent } from 'react'
import './TCard.css'

const glowOrange = {
    background:'orange'
}

const numConnected = {
    width:'295px',
    left:'32px'
}

const numUnconnected = {
    width:'215px',
    left:'32px'
}

const noNum = {
    width:'215px'
}

class TCard extends PureComponent {
    constructor(props) {
        super(props)
        this.placeholder = ''
    }

    render() {
        const { team1, team2, team1Score, team2Score, bestOf, position, num, padding, shouldConnect } = this.props
        let horizontalStyle
        if (num && shouldConnect) {
            horizontalStyle = numConnected
        } else if (num && !shouldConnect) {
            horizontalStyle = numUnconnected
        } else {
            horizontalStyle = noNum
        }

        return (
            <section
                className='tCardWrapper'
                style={
                    {
                        paddingTop: `${padding}px`,
                        paddingBottom: `${padding}px`
                    }
                }
            >
            {num &&
                <div className='tCardNumber'>{num}</div>
            }
                <section className='tCard'>
                    <div className='teamWrapper'>
                        <div className='tCardTeam'>{team1}</div>
                        <div 
                            className='tCardScore'
                            style={team1Score >= bestOf ? glowOrange : null}
                        >
                            {team1Score}
                        </div>
                    </div>
                    <div className='teamWrapper'>
                        <div className='tCardTeam'>{team2}</div>
                        <div 
                            className='tCardScore'
                            style={team2Score >= bestOf ? glowOrange : null}
                        >
                            {team2Score}
                        </div>
                    </div>
                </section>
                <div className='horizontalConnection'
                    style={horizontalStyle}
                />
                {shouldConnect &&
                    <div className='verticalConnection'
                        style = {
                            position%2 === 0 ? { bottom:'0%'} : { top:'0%' }
                        }
                    />
                }
            </section>
        );
    }
}

export default TCard;