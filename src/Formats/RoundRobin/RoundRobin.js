import React, { Component } from 'react'
import './RoundRobin.css'

import RoundOf from './RoundOf/RoundOf'
import Sections from './Sections/Sections'
import ScoreBoard from './ScoreBoard/ScoreBoard'

class RoundRobin extends Component {
    state = {
        showScoreBoard:true
    }

    ToggleScoreBoard = () => {
        const { showScoreBoard } = this.state
        this.setState({showScoreBoard: !showScoreBoard})
    }

    render() {
        const { roundRobinData, roundRobinScoreBoard } = this.props
        let roundOfs = roundRobinData.map(( { TCardList ,bestOf }, index ) =>
            <RoundOf
                key={index}
                round={index + 1}
                TCardList={TCardList}
                bestOf={bestOf}
                shouldConnect={false}
            />
        )

        const { showScoreBoard } = this.state
        return (
            <section className='roundRobin'>
                <div className='scoreBoardWrapper'>
                    <button 
                        className='toggleScoreBoard'
                        onClick={this.ToggleScoreBoard}
                        style={showScoreBoard ? { borderTop:'50px solid blue'} : { borderBottom:'50px solid blue', marginBottom:'30px' }}
                    />
                    {showScoreBoard &&
                        <h1 className='scoreBoardName'>Scoreboard</h1>
                    }
                </div>
                {this.state.showScoreBoard && 
                    <ScoreBoard
                        roundRobinScoreBoard={roundRobinScoreBoard}
                    />
                }
                {roundRobinData.length < 20 &&
                    roundOfs
                }
                {roundRobinData.length >= 20 &&
                    <Sections
                        roundRobinData={roundRobinData}
                        UpdateScore={this.UpdateScore}
                        end={roundRobinData.length - 1}
                    />
                }
            </section>
        );
    }
}

export default RoundRobin