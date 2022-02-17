function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    // 3. Create a variable that holds the samples array. 
    var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
    
   // var result = samplesArray[0];
         
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var newSample = samplesArray.filter(sampleObj => sampleObj.id == sample);
         
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = samplesArray[0];
    
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
     var otuIds = firstSample.otu_ids;
     var otuLabels = firstSample.otu_labels;
     var sampleValues = firstSample.sample_values;
     
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

     //var sorted = otuIds.sort((a,b) => a-b);
    //  console.log(sorted);
     //var reverse = sorted.reverse();
    // code from https://stackoverflow.com/questions/39254218/js-get-top-5-max-elements-from-array/39254328
     var topValues = otuIds.sort((a,b) => b-a).slice(0,10);
     //console.log(topValues);
         

    //  var result = otuIds.slice(0,10);
    //  console.log(result);
     
     var yticks = topValues;
     console.log(yticks);

    8. // Create the trace for the bar chart. 
     var barData = [{
     x: sampleValues.sort((a,b) => b-a).slice(0,10),
     y: yticks,
     labels: otuIds,
     text: otuLabels,
     type: "bar",
     orientation: "h"
   }];
      
    // 9. Create the layout for the bar chart. 
     var barLayout = {
     title: "Top 10 Bacteria Cultures Found",
   };

     
    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", barData, barLayout); 
    
  });

}
// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    
    var samplesArrayB = samples.filter(sampleObj => sampleObj.id == sample);
    //console.log(samplesArrayB);
  
         
    //  5. Create a variable that holds the first sample in the array.
    var firstSampleB = samplesArrayB[0];
    //console.log(firstSampleB);
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
     var otuIdsB = firstSampleB.otu_ids;
     var otuLabelsB = firstSampleB.otu_labels;
     //console.log(otuLabelsB);
     var sampleValuesB = firstSampleB.sample_values;
     
    
    // 1. Create the trace for the bubble chart.
    var bubbleData = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        color: otuIds,
        size: sampleValues
      }      
    };
   
      // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",  
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

// // Create the buildChart function.
// function buildCharts(sample) {
//   // Use d3.json to load the samples.json file 
//   d3.json("samples.json").then((data) => {
//     var metadata = data.metadata;
    

    // // Create a variable that holds the samples array. 
    // var samplesG = data.samples;
    // // Create a variable that filters the samples for the object with the desired sample number.
    // var samplesArrayG = samplesG.filter(sampleObj => sampleObj.id == sample);
    // // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    // var metadataArrayG = metadata.filter(metadataObj => metadataObj.id == metadata);
    // // Create a variable that holds the first sample in the array.
    // var firstSampleG = samplesArrayG[0];
    // console.log(firstSampleG);

    // // 2. Create a variable that holds the first sample in the metadata array.
    // var firstSampleGauge = metadataArrayG[0];
    // console.log(firstSampleGauge);

    // // Create variables that hold the otu_ids, otu_labels, and sample_values.
    //  var otuIdsG = firstSampleG.otu_ids;
    //  //console.log(otuIdsG);
    //  var otuLabelsG = firstSampleG.otu_labels;
    //  //console.log(otuLabelsG);
    //  var sampleValuesG = firstSampleG.sample_values;
    //  //console.log(sampleValuesG);

    // Create var to hold washing frequency
    var metadata = data.metadata;
    console.log(metadata);

    // var wash = metadata[] 
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
// //     // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };


// //     // 6. Use Plotly to plot the gauge data and layout.
     Plotly.newPlot();

//    });
})  
