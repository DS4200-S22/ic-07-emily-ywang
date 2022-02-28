/*

In-class activity 08 starter code
Prof. Mosca
Modified: 12/08/21

*/

// Build your bar charts in this file


// Set dimensions and margins for plots
const width = 900;
const height = 450;
const margin = {left:50, right:50, bottom:50, top:50};
const yTooltipOffset = 15;


// Builds an svg with the dimensions above
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/


// Returns the maximum value from the data1 array
let maxY1 = d3.max(data1, function(d) { return d.score; });


// Maps y data values to pixel values
let yScale1 = d3.scaleLinear() // Makes a linear scale for our linear data
            .domain([0,maxY1]) // changes the domain to include all values from 0 to the maximum value for inputs for the function
            .range([height-margin.bottom,margin.top]); // changes the range to fit the range of values for outputs for the function

// Maps x data values to pixel values
let xScale1 = d3.scaleBand() // Sets up the bars and its band scale
            .domain(d3.range(data1.length)) // Sets the domain (width) being the range of the inputs
            .range([margin.left, width - margin.right]) // Sets the range (height) of the bars (outputs)
            .padding(0.1); // Defines the spacing between each bar

// Add y axis to svg1
svg1.append("g") // g is a "placeholder" svg
   .attr("transform", `translate(${margin.left}, 0)`) // Moves axis to left of svg
   .call(d3.axisLeft(yScale1)) // Uses built in function for left axis given the scale
   .attr("font-size", '20px'); // Sets font size

// Add x axis to svg1
svg1.append("g") // g is a "placeholder" svg
    .attr("transform", `translate(0,${height - margin.bottom})`) // Moves axis to bottom of svg
    .call(d3.axisBottom(xScale1) // Uses built in function for bottom axis given the scale
            .tickFormat(i => data1[i].name)) // Adds ticks
    .attr("font-size", '20px'); // Sets font size

/*

  Tooltip Set-up

*/

const tooltip1 = d3.select("#hard-coded-bar") // Selects all hard coded bars
                .append("div") // Adds the div properties
                .attr('id', "tooltip1") // Sets id to tooltip1
                .style("opacity", 0) // Sets bar opacity to 0
                .attr("class", "tooltip"); // Sets class to tooltip

// Creates event handler that is triggered when mouse is over the bar
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // Sets html to show name and score
          .style("opacity", 1); // Sets opacity to 1 so tooltip shows up
}

// Creates event handler that is triggered when mouse is moved over the bar
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") // Set position of tooltip to be where x value of where mouse is plus offset
          .style("top", (event.y + yTooltipOffset) +"px"); // Set position of tooltip to be equal to y value of where mouse is plus offset
}

// Creates event handler that is triggered when mouse leaves the bar
const mouseleave1 = function(event, d) {
  tooltip1.style("opacity", 0); // sets the tooltip opacity to 0 so it disappears
}

/*

  Bars

*/

svg1.selectAll(".bar") // select all bars in svg1
   .data(data1) // Inputs hard-coded data1 values
   .enter() // Joins data1 and bars
   .append("rect") // Appends a rectangle for each bar
     .attr("class", "bar") // Adds the attribute class with bar
     .attr("x", (d,i) => xScale1(i)) // Return pixel value for which category we're on based on xScale
     .attr("y", (d) => yScale1(d.score)) // Return pixel value for which y position we're on based on yScale of the score
     // Mapping score values to pixel values
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // Sets height for the bars
     .attr("width", xScale1.bandwidth()) // Sets width of bars with bandwidth built-in function
     .on("mouseover", mouseover1) // Calls mouseover1 event listener and link to event handler
     .on("mousemove", mousemove1) // Calls mousemove1 event listener and link to event handler
     .on("mouseleave", mouseleave1); // Calls mouseleave event listener and link to event handler




/* Create svg2 bar chart with csv values */
const svg2 = d3
    .select("#csv-bar")
    .append("svg")
    .attr("width", width-margin.left-margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);


d3.csv("/data/barchart.csv").then((data) => {
  // Returns the maximum value from the data2 array
  let maxY2 = d3.max(data, function(d) { return d.score; });


  // Maps y data values to pixel values
  let yScale2 = d3.scaleLinear() // Makes a linear scale for our linear data
              .domain([0,maxY2]) // changes the domain to include all values from 0 to the maximum value for inputs for the function
              .range([height-margin.bottom,margin.top]); // changes the range to fit the range of values for outputs for the function

  // Maps x data values to pixel values
  let xScale2 = d3.scaleBand() // Sets up the bars and its band scale
              .domain(d3.range(data.length)) // Sets the domain (width) being the range of the inputs
              .range([margin.left, width - margin.right]) // Sets the range (height) of the bars (outputs)
              .padding(0.1); // Defines the spacing between each bar


  // Add y axis to svg2
  svg2.append("g") // g is a "placeholder" svg
      .attr("transform", `translate(${margin.left}, 0)`) // Moves axis to left of svg
      .call(d3.axisLeft(yScale2)) // Uses built in function for left axis given the scale
      .attr("font-size", '20px'); // Sets font size

  // Add x axis to svg2
  svg2.append("g") // g is a "placeholder" svg
      .attr("transform", `translate(0,${height - margin.bottom})`) // Moves axis to bottom of svg
      .call(d3.axisBottom(xScale2) // Uses built in function for bottom axis given the scale
                  .tickFormat(i => data[i].name)) // Adds ticks
      .attr("font-size", '20px'); // Sets font size


  svg2.selectAll(".bar") // select all bars in svg2
      .data(data) // Inputs hard-coded data1 values
      .enter() // Joins data1 and bars
      .append("rect") // Appends a rectangle for each bar
        .attr("class", "bar") // Adds the attribute class with bar
        .attr("x", (d,i) => xScale2(i)) // Return pixel value for which category we're on based on xScale
        .attr("y", (d) => yScale2(d.score)) // Return pixel value for which y position we're on based on yScale of the score
        // Mapping score values to pixel values
        .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) // Sets height for the bars
        .attr("width", xScale2.bandwidth()) // Sets width of bars with bandwidth built-in function
        .on("mouseover", mouseover1) // Calls mouseover1 event listener and link to event handler
        .on("mousemove", mousemove1) // Calls mousemove1 event listener and link to event handler
        .on("mouseleave", mouseleave1); // Calls mouseleave event listener and link to event handler

});
