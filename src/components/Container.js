import React, { Component } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DropArea from './DropArea'
import Box from './Box'
import ChartComponent from './ChartComponent'
import ColorComponent from './ColorComponent'
import FillColorComponent from './FillColorComponent'
import ToolBar from './ToolBar'
import UUID from 'uuid'

export default class Container extends Component {
	constructor(){
		super()
		this.state = {
			charts: [],
			colors: [],
			fillColors: [],
			colorObjects: [],
			fillColorObjects: []
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
			alpha: 0,
			id: id
		}
		newColorObjects.push(color)

		let newFillColorObjects = this.state.fillColorObjects.slice(0)
		let fillColor = {
			red: 0,
			green: 0,
			blue: 0,
			alpha: 0,
			id: id
		}
		newFillColorObjects.push(fillColor)

		this.setState({
			colorObjects: newColorObjects,
			fillColorObjects: newFillColorObjects}, () => {
			// let index = this.state.colorObjects.length - 1
			let newCharts = this.state.charts.slice(0)
			newCharts.push({
				// color: this.state.colorObjects[index],
				color: color,
				fillColor: fillColor,
				id: id,
				key: newCharts.length,
				xPos: xPos,
				yPos: yPos
			})
			this.setState({charts: newCharts})
		})

	}

	renderFillColor = (event) => {
		let newFillColors = this.state.fillColors.slice(0)
		newFillColors.push({
			id: this.state.charts.slice(-1)[0].id,
			changeFillColors: this.changeFillColors,
			key: newFillColors.length,
			xPos: event.clientX,
			yPos: event.clientY,
		})
		this.setState({fillColors: newFillColors}, () => {console.log(this.state.fillColors)})
	}

	renderColor = (event) => {
		let newColors = this.state.colors.slice(0)
		newColors.push({
			id: this.state.charts.slice(-1)[0].id,
			changeColors: this.changeColors,
			key: newColors.length,
			xPos: event.clientX,
			yPos: event.clientY,
		})
		this.setState({colors: newColors})
	}

	changeColors = (red, green, blue, alpha, id) => {
		let color = this.state.colorObjects.find((color)=>{return color.id === id})
		let index = this.state.colorObjects.indexOf(color)
		let updatedColors = [...this.state.colorObjects]
		updatedColors[index] = {red: red, green: green, blue: blue, alpha: alpha/100, id: id}
		this.setState({
			colorObjects: updatedColors
		})
	}

	changeFillColors = (red, green, blue, alpha, id) => {
		let color = this.state.fillColorObjects.find((color)=>{return color.id === id})
		let index = this.state.fillColorObjects.indexOf(color)
		let updatedColors = [...this.state.fillColorObjects]
		updatedColors[index] = {red: red, green: green, blue: blue, alpha: alpha/100, id: id}
		this.setState({
			fillColorObjects: updatedColors
		})
	}

	render() {
		let charts = this.state.charts.map(chart => {
			let thisColor = this.state.colorObjects.find(color => {return color.id === chart.id})
			let thisFillColor = this.state.fillColorObjects.find(color => {return color.id === chart.id})
			return <ChartComponent color={thisColor} fillColor={thisFillColor} id={chart.id} key={chart.key} name="Chart" xPos={chart.xPos} yPos={chart.yPos}/>
		})
		let colors = this.state.colors.map(color => {
			return <ColorComponent id={color.id} changeColors={color.changeColors} key={color.key} name="Color" xPos={color.xPos} yPos={color.yPos}/>
		})

		let fillColors = this.state.fillColors.map(color => {
			return <FillColorComponent id={color.id} changeColors={color.changeFillColors} key={color.key} name="Color" xPos={color.xPos} yPos={color.yPos}/>
		})
		console.log(fillColors)
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
            <DropArea name="DropArea" />
          </div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
            <ToolBar renderChart={this.renderChart} renderColor={this.renderColor} renderFillColor={this.renderFillColor}name="ToolBar" />
          </div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            {charts}
          </div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
            {colors}
          </div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
            {fillColors}
          </div>
				</div>
			</DragDropContextProvider>
		)
	}
}
