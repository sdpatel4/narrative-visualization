const jsonUrl = 'data.json';

async function filterFruitByForm(form) {
    d3.select("#container").html("");

    const fruit = [];

    await d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            if (f.Form === form) {
                fruit.push(f);
            }
        });
    });

    const container = d3.select("#container");
    container.selectAll("p")
    .data(fruit)
    .enter()
    .append("p")
    .text(d => `${d.Fruit}`);
    
    return fruit;
}

async function displayAllFruit() {
    fruit = []

    await d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            fruit.push(f);
        });
    });

    const container = d3.select("#container");
    container.selectAll("p")
    .data(fruit)
    .enter()
    .append("p")
    .text(d => `${d.Fruit}`);
    
    return fruit;
}

function showFormFruitTooltip() {
    const annotations = [
        {
            note: {
            title: "",
            label: "Use this dropdown to filter by fruit form. Click to continue."
            },
            x: 200,
            y: 160,
            dy: -50,
            dx: 50
        }
    ];

    const makeAnnotations = d3.annotation()
    .annotations(annotations);

    const svg = d3.select("body")
    .append("svg")
    .attr("width", 250)
    .attr("height", 150)
    .style("position", "absolute")
    svg.append("g")
    .attr("class", "annotation-group")
    .style("transform", "translateX(-150px)")
    .call(makeAnnotations);
}

function showRetailPriceSliderTooltip() {
    d3.select('svg').html("");

    const annotations = [
        {
            note: {
            title: "",
            label: "Use this dropdown to filter by retail price. Interact to continue."
            },
            x: 200,
            y: 160,
            dy: -50,
            dx: 50
        }
    ];

    const makeAnnotations = d3.annotation()
    .annotations(annotations);

    const svg = d3.select("body")
    .append("svg")
    .attr("width", 250)
    .attr("height", 150)
    .style("position", "absolute")
    .style("transform", "translateX(300px)")
    .style("top", "20px");
    svg.append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations);
}

async function hideTooltip() {
    d3.select("svg").html("");
}

async function getMaxRetailPrice() {
    let max = 0;

    await d3.json(jsonUrl).then(function(data) {
        max = Math.max(data.RetailPrice, max);
    });

    return max;
}

function getMinRetailPrice() {
    let min = 1000;

    await d3.json(jsonUrl).then(function(data) {
        min = Math.min(data.RetailPrice, min);
    });

    return min;
}