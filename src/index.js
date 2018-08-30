import React, { Component } from 'react'
import { render, findDOMNode } from 'react-dom'
import { BrowserRouter, withRouter } from 'react-router-dom'
import './TheBracket.css'
import './index.css'

import SingleElimination from './Formats/SingleElimination/SingleElimination'
import RoundRobin from './Formats/RoundRobin/RoundRobin'

// WHEN THIS THING LOADS, FETCH tournamentName, tournamentFormat, singleEliminationData, roundRobinData, roundRobinScoreBoard
// url is guarenteed to be '/[0-9]+$'

class TheBracket extends Component {
    constructor(props) {
        super(props)
        this.isMouseDown = false
        this.theBracket = null
        this.vectorX = null
        this.vectorY = null
        this.zoom = 100
    }

    MouseDown = (e) => {
        this.isMouseDown = true
        if (e.clientX >= 0 && e.clientY >= 0) {
            this.vectorX = e.clientX
            this.vectorY = e.clientY
        } else if (e.touches) {
            this.vectorX = e.touches[0].clientX
            this.vectorY = e.touches[0].clientY
        }
    }

    Drag = (e) => {
        e.preventDefault()
        if (this.isMouseDown) {
            let scrollX, scrollY
            if (e.clientX && e.clientY) {
                scrollX = this.vectorX - e.clientX
                scrollY = this.vectorY - e.clientY
                this.vectorX = e.clientX
                this.vectorY = e.clientY
            } else if (e.touches) {
                scrollX = this.vectorX - e.touches[0].clientX
                scrollY = this.vectorY - e.touches[0].clientY
                this.vectorX = e.touches[0].clientX
                this.vectorY = e.touches[0].clientY
            }
            this.theBracket.scrollTop += scrollY ? scrollY : 0
            this.theBracket.scrollLeft += scrollX ? scrollX : 0
        }
    }

    MouseUp = () => {
        this.isMouseDown = false
    }

    componentDidMount = () => {
        this.theBracket = findDOMNode(this.refs['theBracket'])
        // extract the id from this and fetch
        const path = this.props.history.location.pathname

        /* http://localhost:1337 */
        /* https://ezbracketapi.herokuapp.com */

        fetch(`https://ezbracketapi.herokuapp.com${path}`)
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                this.setState({
                    tournamentName: data.tournamentName,
                    tournamentFormat: data.tournamentFormat,
                    singleEliminationData: data.singleEliminationData,
                    roundRobinData: data.roundRobinData,
                    roundRobinScoreBoard: data.roundRobinScoreBoard
                }, () => 
                    this.theBracket = findDOMNode(this.refs['theBracket'])
                )
            } else {
                alert('Sorry, the bracket does not exist!')
            }
        })
        .catch(() => alert('Sorry, the bracket does not exist!'))
    }

    render() {
        return (
            <React.Fragment>
                {this.state &&
                    <section
                        className='bracketSection'
                    >
                        <h1 className='tournamentNameOnTopOfBracket'>{this.state.tournamentName}</h1>
                        <h2 className='tournamentFormatOnTopOfBracket'>{this.state.tournamentFormat}</h2>
                        <section
                            className='theBracket'
                            ref='theBracket'
                            onMouseDown={this.MouseDown}
                            onMouseMove={this.Drag}
                            onMouseUp={this.MouseUp}
                            onMouseLeave={this.MouseUp}
                            onTouchStart={this.MouseDown}
                            onTouchMove={this.Drag}
                            onTouchEnd={this.MouseUp}
                        >
                            <div className='bracketTop'/>
                            <div className='bracketMid'>
                                <div className='bracketLeftSpace'/>
                                {this.state.tournamentFormat === 'Single Elimination' &&
                                    <SingleElimination
                                        singleEliminationData={this.state.singleEliminationData}
                                    />
                                }
                                {this.state.tournamentFormat === 'Round Robin' &&
                                    <RoundRobin
                                        roundRobinData={this.state.roundRobinData}
                                        roundRobinScoreBoard={this.state.roundRobinScoreBoard}
                                    />
                                }
                                <div className='bracketRightSpace'/>
                            </div>
                            <div className='bracketBottom'/>
                        </section>
                    </section>
                }
            </React.Fragment>
        );
    }
}

const HistoryBracket = withRouter(TheBracket)

render(
    <BrowserRouter>
        <HistoryBracket/>
    </BrowserRouter>,
    document.getElementById('root')
)