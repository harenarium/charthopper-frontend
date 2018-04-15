import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
	// border: '1px dashed gray',
  height: '200px',
  width: '200px',
	backgroundColor: 'silver',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
	position: 'absolute',
	top: '',
	left: ''
}

const colorSource = {
	beginDrag(props) {
		return {
			name: props.name,
		}
	},

	endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()
	}
}

class FillColorComponent extends Component{

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }

  constructor(){
    super()

    this.state={
			colorX: 0,
			colorY: 0,
			xDif: 0,
			yDif: 0,
      red: 0,
      green: 0,
      blue: 0,
      alpha: 100,
      chartID: ''
    }
  }

  componentDidMount() {
    // this.initializeColor(this.setColorParams());
    style.left = `${this.props.xPos - this.state.xDif}px`
    style.top = `${this.props.yPos - this.state.yDif}px`
    this.setState({
      colorX: this.props.xPos - this.state.xDif,
      colorY: this.props.yPos - this.state.yDif
    })
  }

  getOgMousePos = (event) => {
    this.setState({
      xDif: event.clientX - this.state.colorX,
      yDif: event.clientY - this.state.colorY
    })
  }

	getMousePos = (event) => {
		style.left = `${event.clientX - this.state.xDif}px`
		style.top = `${event.clientY - this.state.yDif}px`
		this.setState({
			colorX: event.clientX - this.state.xDif,
			colorY: event.clientY - this.state.yDif
		})
	}

  setColor = (event) => {
    let name = event.target.name
    let value = parseInt(event.target.value)
    if(name === 'alpha' && value > 100){
      value = 100
    }
    if(value > 255){
      value = 255
    } else if (value < 0){
      value = 0
    }
    if (typeof value === "number"){
      console.log(this.props)
      this.setState({[name]: value}, () => { this.props.changeColors(this.state.red, this.state.green, this.state.blue, this.state.alpha, this.props.id) })
    }
  }

  render() {
    const { isDragging, connectDragSource } = this.props
		const { name } = this.props
		const opacity = isDragging ? 0.4 : 1

    return connectDragSource(
        <div onDragStart={this.getOgMousePos} onDragEnd={this.getMousePos} style={{ ...style, opacity}} >
          <div style={{padding: '10px'}}>
            Fill Color
          </div>
          <div>
            <input onChange={this.setColor} value={this.state.red} name="red" type="number" placeholder="Red Value" min={0} max={255}/>
            <input onChange={this.setColor} value={this.state.green} name="green" type="number" placeholder="Green Value" min={0} max={255}/>
            <input onChange={this.setColor} value={this.state.blue} name="blue" type="number" placeholder="Blue Value" min={0} max={255}/>
            <input onChange={this.setColor} value={this.state.alpha} name="alpha" type="number" placeholder="Alpha" min={0} max={100}/>
          </div><br></br>
          <div style={{backgroundColor: `rgba(${this.state.red}, ${this.state.green}, ${this.state.blue}, ${this.state.alpha/100})`, height: '100px', width: '100px', margin: 'auto'}}>
          </div>
        </div>
    )
  }
}

export default DragSource(ItemTypes.FILLCOLOR, colorSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(FillColorComponent);
