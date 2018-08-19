import React, { Component } from 'react'
import './ScoreBoard.css'

import Row from './Row/Row'

class ScoreBoard extends Component {
    render() {
        const { roundRobinScoreBoard } = this.props
        let rows = []
        for (const obj in roundRobinScoreBoard) {
            const info = roundRobinScoreBoard[obj]
            rows.push(
                <Row
                    key={obj}
                    name={info.name}
                    win={info.win}
                    loss={info.loss}
                />
            )
        }
        return (
            <section className='scoreBoard'>
                {rows}
            </section>
        );
    }
}

export default ScoreBoard