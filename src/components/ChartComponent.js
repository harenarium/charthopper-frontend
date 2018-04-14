import React, { Component } from 'react'
import Chart from 'chart.js';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
	// border: '1px dashed gray',
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

const years = [1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017 ]

const temps = [-0.19, -0.10, -0.10, -0.19, -0.28, -0.31, -0.32, -0.35, -0.18, -0.11, -0.37, -0.24, -0.27, -0.32, -0.32, -0.22, -0.11, -0.12, -0.28, -0.18, -0.09, -0.15, -0.30, -0.39, -0.49, -0.28, -0.23, -0.40, -0.44, -0.48, -0.44, -0.43, -0.36, -0.35, -0.16, -0.12, -0.33, -0.43, -0.28, -0.27, -0.25, -0.17, -0.27, -0.24, -0.25, -0.21, -0.09, -0.20, -0.19, -0.35, -0.15, -0.10, -0.17, -0.30, -0.14, -0.21, -0.16, -0.04, -0.03, -0.03, 0.110, 0.180, 0.050, 0.070, 0.210, 0.090, -0.07, -0.04, -0.11, -0.11, -0.19, -0.07, 0.010, 0.070, -0.15, -0.14, -0.20, 0.040, 0.070, 0.030, -0.02, 0.060, 0.040, 0.070, -0.20, -0.10, -0.05, -0.02, -0.07, 0.070, 0.030, -0.09, 0.010, 0.160, -0.08, -0.02, -0.11, 0.170, 0.060, 0.160, 0.270, 0.330, 0.130, 0.310, 0.160, 0.120, 0.180, 0.330, 0.410, 0.280, 0.440, 0.410, 0.220, 0.240, 0.310, 0.440, 0.330, 0.470, 0.620, 0.400, 0.400, 0.540, 0.620, 0.610, 0.530, 0.670, 0.620, 0.640, 0.520, 0.630, 0.700, 0.570, 0.610, 0.640, 0.730, 0.860, 0.990, 0.900]

const chartSource = {
	beginDrag(props) {
		return {
			name: props.name,
		}
	},

	endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()
	},
}

class ChartComponent extends Component{

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }

  constructor(props){
    super(props)
		console.log(this.props.key)

    this.state={
      type: "line",
      backgroundColor: "rgba(255, 255, 255, 0",
      borderColor: "rgba(0, 0, 0, 1)",
      borderWidth: 1,
			radius: 0,
      label: "",
      labels: years,
      data: temps,
      options: {},
			chartX: 0,
			chartY: 0,
			xDif: 0,
			yDif: 0
    }
  }

	// componentWillReceiveProps(nextProps) {
	// 	style.top = nextProps.chartY
	// 	style.left = nextProps.chartX
	// }

	getMousePos = (event) => {
		style.left = `${event.clientX - this.state.xDif}px`
		style.top = `${event.clientY - this.state.yDif}px`
		this.setState({
			chartX: event.clientX - this.state.xDif,
			chartY: event.clientY - this.state.yDif
		})
	}

	getOgMousePos = (event) => {
		// xDif = event.clientX - this.state.chartX
		// yDif = event.clientY - this.state.chartY
		this.setState({
			xDif: event.clientX - this.state.chartX,
			yDif: event.clientY - this.state.chartY
		})
	}

  setChartParams = () => {
    const config = {
      type: this.state.type,
      data: {
        labels: this.state.labels,
        datasets: [{
          label: this.state.label,
          data: this.state.data,
          backgroundColor: this.state.backgroundColor,
          borderColor: this.state.borderColor,
          borderWidth: this.state.borderWidth,
					radius: this.state.radius
        }]
      },
      options: {}
    }
    return config
  }

  componentDidMount() {
    this.initializeChart(this.setChartParams());
		style.left = `${this.props.xPos - this.state.xDif}px`
		style.top = `${this.props.yPos - this.state.yDif}px`
		this.setState({
			chartX: this.props.xPos - this.state.xDif,
			chartY: this.props.yPos - this.state.yDif
		})
  }

  initializeChart(options) {
    let el = ReactDOM.findDOMNode(this.refs.chart);
    let ctx = el.getContext("2d");
    let chart = new Chart(ctx, options);
  }

	changeColor = () => {
		this.setState({
			backgroundColor: "rgba(100, 200, 50, 100)"
		}, () => {
			this.initializeChart(this.setChartParams());
		})
	}

	componentWillReceiveProps(nextProps){
		this.setState({borderColor: `rgba(${nextProps.color.red},${nextProps.color.green},${nextProps.color.blue},${nextProps.color.alpha})`},  () => {
			this.initializeChart(this.setChartParams());
		})
	}


  render() {
    const { isDragging, connectDragSource } = this.props
		const { name } = this.props
		const opacity = isDragging ? 0.4 : 1

    return connectDragSource(
      <div onDragStart={this.getOgMousePos} onDragEnd={this.getMousePos} style={{ ...style, opacity, width:"25%" }} >
        <canvas ref='chart' name={name} />
				<button onClick={this.changeColor}></button>
      </div>
    )
  }
}

export default DragSource(ItemTypes.CHART, chartSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(ChartComponent);
