const jsonUrl = 'data.json';
let globalForm = "";
let globalPrice = 1000;

async function filterFruitByForm(form) {
    d3.select("#container").html("");
    globalForm = form;

    const fruit = [];

    await d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            if ((f.Form === form || form === "Please choose a form") && f.RetailPrice <= globalPrice) {
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

async function filterFruitByPrice(price) {
    d3.select("#container").html("");
    globalPrice = price;

    const fruit = [];

    await d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            if (f.RetailPrice <= price && (f.Form === globalForm || globalForm === "Please choose a form")) {
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
    d3.select("#retailPrice").attr("disabled", null);

    const annotations = [
        {
            note: {
            title: "",
            label: "Use this slider to filter by retail price. Interact to continue."
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
    .style("transform", "translateX(200px)")
    .style("top", "20px");
    svg.append("g")
    .style("transform", "translateX(-120px)")
    .attr("class", "annotation-group")
    .call(makeAnnotations);
}

function hideTooltip() {
    d3.select("svg").html("");
}