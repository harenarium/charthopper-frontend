import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
import ChartButton from './ChartButton'
import ColorButton from './ColorButton'

const style = {
  position: 'fixed',
  height:'100%',
  width: '10%',
	backgroundColor: 'black',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
}

const toolbarSource = {
	beginDrag(props) {
		return {
			name: props.name,
		}
	},

	endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
			alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
		}
	},
}

class ToolBar extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
	}

	render() {
		const { isDragging, connectDragSource } = this.props
		const { name } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
      <div style={{ ...style, opacity }}>
        <ChartButton renderChart={this.props.renderChart} name="Add Chart"/>
        <ColorButton renderColor={this.props.renderColor} name="Add Color"/>
      </div>)
	}
}

export default DragSource(ItemTypes.TOOLBAR, toolbarSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(ToolBar);
