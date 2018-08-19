import React, { Component } from 'react'
import './SingleElimination.css'

import RoundOf from './RoundOf/RoundOf'

class SingleElimination extends Component {
    render() {
        const data = this.props.singleEliminationData
        const teams = data.map(({TCardList}) => TCardList)
        return (
            <section className='singleElimination'>
                {data.map(( { bestOf }, index ) =>
                    <RoundOf
                        key={index}
                        round={index + 1}
                        maxRounds={data.length}
                        TCardList={teams[index]}
                        bestOf={bestOf}
                        shouldConnect={index !== data.length - 1}
                    />
                )}
            </section>
        )
    }
}

export default SingleElimination