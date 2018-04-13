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
			colors: [],
			colorObjects: []
		}
	}

	renderChart = (event) => {
		let xPos = event.clientX
		let yPos = event.clientY
		let id = UUID()
		let newColorObjects = this.state.colorObjects.slice(0)
		let color = {
			red: 0,
			green: 0,
			blue: 0,
			alpha: 1,
			id: id
		}
		newColorObjects.push(color)

		this.setState({colorObjects: newColorObjects}, () => {
			let index = this.state.colorObjects.length - 1
			let newCharts = this.state.charts.slice(0)
			newCharts.push({
				color: this.state.colorObjects[index],
				id: id,
				key: UUID(),
				xPos: xPos,
				yPos: yPos
			})
			this.setState({charts: newCharts})
		})
	}

	renderColor = (event) => {
		let newColors = this.state.colors.slice(0)
		newColors.push({
			id: this.state.charts.slice(-1)[0].id,
			changeColors: this.changeColors,
			key: UUID(),
			xPos: event.clientX,
			yPos: event.clientY,
		})
		this.setState({colors: newColors})
	}

	changeColors = (red, green, blue, alpha, id) => {
		// console.log(this.state.colorObjects)
		let color = this.state.colorObjects.find((color)=>{return color.id === id})
		let index = this.state.colorObjects.indexOf(color)
		let updatedColors = [...this.state.colorObjects]
		updatedColors[index] = {red: red, green: green, blue: blue, alpha: alpha, id: id}
		this.setState({
			colorObjects: updatedColors
		})

		// color.red = red
		// color.green = green
		// color.blue = blue
		// color.alpha = alpha
		// console.log(red)
	}

	render() {
		let charts = this.state.charts.map(chart => {
			return <ChartComponent color={chart.color} id={chart.id} key={chart.key} name="Chart" xPos={chart.xPos} yPos={chart.yPos}/>
		})
		let colors = this.state.colors.map(color => {
			return <ColorComponent id={color.id} changeColors={color.changeColors} key={color.key} name="Color" xPos={color.xPos} yPos={color.yPos}/>
		})

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
            {charts}
          </div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
            {colors}
          </div>
				</div>
			</DragDropContextProvider>
		)
	}
}
