/*

In-class activity 08 starter code
Prof. Mosca
Modified: 12/08/21

*/

// Build your scatterplot in this file




/* Create svg3 scatterplot with csv values */
const svg3 = d3
    .select("#csv-scatter")
    .append("svg")
    .attr("width", width-margin.left-margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);


d3.csv("/data/scatter.csv").then((data) => {
  // Returns the maximum value from the data2 array
  let maxY3 = d3.max(data, function(d) { return d.score; });

  // Maps y data values to pixel values
  let yScale3 = d3.scaleLinear() // Makes a linear scale for our linear data
              .domain([0,maxY3]) // changes the domain to include all values from 0 to the maximum value for inputs for the function
              .range([height-margin.bottom,margin.top]); // changes the range to fit the range of values for outputs for the function

  let maxX3 = d3.max(data, function(d) { return d.day; });


  // Maps x data values to pixel values
  let xScale3 = d3.scaleLinear() // Sets up the bars and its band scale
              .domain([0,maxX3]) // Sets the domain (width) being the range of the inputs
              .range([margin.left, width - margin.right]); // Sets the range (height) of the bars (outputs)


  // Add y axis to svg3
  svg3.append("g") // g is a "placeholder" svg
      .attr("transform", `translate(${margin.left}, 0)`) // Moves axis to left of svg
      .call(d3.axisLeft(yScale3)) // Uses built in function for left axis given the scale
      .attr("font-size", '20px'); // Sets font size

  // Add x axis to svg3
  svg3.append("g") // g is a "placeholder" svg
      .attr("transform", `translate(0,${height - margin.bottom})`) // Moves axis to bottom of svg
      .call(d3.axisBottom(xScale3)) // Uses built in function for bottom axis given the scale
      .attr("font-size", '20px'); // Sets font size


  svg3.selectAll("circle") // select all points
      .data(data) // Inputs hard-coded data1 values
      .enter() // Joins data1 and bars
      .append("circle") // Appends a circle for each data point
        .attr("cx", (d) => xScale3(d.day))
        .attr("cy", (d) => yScale3(d.score))
        .attr("r", 10)
        .attr("fill", "orange")
        .attr("class", "SimpleScatter") // Adds the attribute class with scatterplot
      .on("mouseover", mouseover2) // Calls mouseover2 event listener and link to event handler
      .on("mousemove", mousemove2) // Calls mousemove2 event listener and link to event handler
      .on("mouseleave", mouseleave2); // Calls mouseleave2 event listener and link to event handler

});


/*

  Tooltip Set-up

*/

const tooltip2 = d3.select("#csv-scatter") // Selects all hard coded bars
                .append("div") // Adds the div properties
                .attr('id', "tooltip2") // Sets id to tooltip1
                .style("opacity", 0) // Sets bar opacity to 0
                .attr("class", "tooltip"); // Sets class to tooltip

// Creates event handler that is triggered when mouse is over the point
const mouseover2 = function(event, d) {
  tooltip2.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") // Sets html to show name and score
          .style("opacity", 1); // Sets opacity to 1 so tooltip shows up
}

// Creates event handler that is triggered when mouse is moved over the bar
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.pageX)+"px") // Set position of tooltip to be where x value of where mouse is plus offset
          .style("top", (event.pageY + yTooltipOffset) +"px"); // Set position of tooltip to be equal to y value of where mouse is plus offset
}

// Creates event handler that is triggered when mouse leaves the bar
const mouseleave2 = function(event, d) {
  tooltip2.style("opacity", 0); // sets the tooltip opacity to 0 so it disappears
}
