import React from 'react'
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

const years = [1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017 ]

const temps = [-0.19, -0.10, -0.10, -0.19, -0.28, -0.31, -0.32, -0.35, -0.18, -0.11, -0.37, -0.24, -0.27, -0.32, -0.32, -0.22, -0.11, -0.12, -0.28, -0.18, -0.09, -0.15, -0.30, -0.39, -0.49, -0.28, -0.23, -0.40, -0.44, -0.48, -0.44, -0.43, -0.36, -0.35, -0.16, -0.12, -0.33, -0.43, -0.28, -0.27, -0.25, -0.17, -0.27, -0.24, -0.25, -0.21, -0.09, -0.20, -0.19, -0.35, -0.15, -0.10, -0.17, -0.30, -0.14, -0.21, -0.16, -0.04, -0.03, -0.03, 0.110, 0.180, 0.050, 0.070, 0.210, 0.090, -0.07, -0.04, -0.11, -0.11, -0.19, -0.07, 0.010, 0.070, -0.15, -0.14, -0.20, 0.040, 0.070, 0.030, -0.02, 0.060, 0.040, 0.070, -0.20, -0.10, -0.05, -0.02, -0.07, 0.070, 0.030, -0.09, 0.010, 0.160, -0.08, -0.02, -0.11, 0.170, 0.060, 0.160, 0.270, 0.330, 0.130, 0.310, 0.160, 0.120, 0.180, 0.330, 0.410, 0.280, 0.440, 0.410, 0.220, 0.240, 0.310, 0.440, 0.330, 0.470, 0.620, 0.400, 0.400, 0.540, 0.620, 0.610, 0.530, 0.670, 0.620, 0.640, 0.520, 0.630, 0.700, 0.570, 0.610, 0.640, 0.730, 0.860, 0.990, 0.900]

// const config = {
//     type: 'line',
//     data: {
//         labels: years,
//         datasets: [{
//             label: 'Temperature',
//             data: temps,
//             backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)' ],
//             borderColor: [ 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)' ],
//             borderWidth: 1
//         }]
//     },
//     options: {}
//   }


class ChartComponent extends React.Component{
  constructor(){
    super()

    this.state={
      type: "line",
      backgroundColor: "rgb(255, 255, 255, 0)",
      borderColor: "rgb(0, 0, 0)",
      borderWidth: 1,
      label: "",
      labels: years,
      data: temps,
      options: {}
    }
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
          borderWidth: this.state.borderWidth
        }]
      },
      options: {}
    }
    return config
  }

  componentDidMount() {
    this.initializeChart(this.setChartParams());
  }

  initializeChart(options) {;
    let el = ReactDOM.findDOMNode(this.refs.chart);
    let ctx = el.getContext("2d");
    let chart = new Chart(ctx, options);
  }

  render() {
    return (
      <div style={{width:"25%"}} >
        <canvas ref="chart"  />
      </div>
    );
  }
}

export default ChartComponent
