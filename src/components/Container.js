import React, { Component } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DropArea from './DropArea'
import Box from './Box'
import ChartComponent from './ChartComponent'
import ColorComponent from './ColorComponent'
import ToolBar from './ToolBar'
import UUID from 'uuid'

export default class Container extends Component {
	constructor(){
		super()
		this.state = {
			charts: [],
			colors: []
		}
	}
	renderChart = (event) => {
		let newCharts = this.state.charts.slice(0)
		newCharts.push(<ChartComponent key={UUID()} name="Chart" xPos={event.clientX} yPos={event.clientY}/>)
		this.setState({charts: newCharts})
	}

	renderColor = (event) => {
		let newColors = this.state.colors.slice(0)
		newColors.push(<ColorComponent key={UUID()} name="Color" xPos={event.clientX} yPos={event.clientY}/>)
		this.setState({colors: newColors})
	}

	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
            <DropArea name="DropArea" />
          </div>
					{/* <div style={{ overflow: 'hidden', clear: 'both' }}>
						<Dustbin />
					</div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
						<Box name="Glass" />
						<Box name="Banana" />
						<Box name="Paper" />
					</div> */}
					<div style={{ overflow: 'hidden', clear: 'both' }}>
            <ToolBar renderChart={this.renderChart} renderColor={this.renderColor} name="ToolBar" />
          </div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            {this.state.charts}
          </div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
            {this.state.colors}
          </div>
				</div>
			</DragDropContextProvider>
		)
	}
}
