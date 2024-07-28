const jsonUrl = 'data.json';
const DEFAULT_FORM = "Filter by form";
let globalForm = DEFAULT_FORM;
let globalPrice = 1000;
let firstPriceSliderClick = true;
let firstFruitFormClick = true;
let firstFruitResultsClick = true;

async function filterFruitByForm(form) {
    d3.select("#container").html("");
    globalForm = form;

    const fruit = [];

    await d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            if ((f.Form === form || form === DEFAULT_FORM) && f.RetailPrice <= globalPrice) {
                fruit.push(f);
            }
        });
    });

    updateResults(fruit);
    
    return fruit;
}

async function filterFruitByPrice(price) {
    d3.select("#container").html("");
    globalPrice = price;

    const fruit = [];

    await d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            if (f.RetailPrice <= price && (f.Form === globalForm || globalForm === DEFAULT_FORM)) {
                fruit.push(f);
            }
        });
    });

    updateResults(fruit);
    
    return fruit;
}

function updateResults(fruit) {
    const container = d3.select("#container");

    if (fruit.length > 0) {
        container.selectAll("p")
        .data(fruit)
        .enter()
        .append("p")
        .text(d => `${d.Fruit}, price: ${d.RetailPrice}`);
    } else {
        container.html("");
        container.select("p")
        .append("p")
        .text("No results match your filter criteria");
    }
}

async function displayAllFruit() {
    fruit = [];

    await d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            fruit.push(f);
        });
    });

    updateResults(fruit);
    
    return fruit;
}

function showFormFruitTooltip() {
    if (firstFruitFormClick) {
        firstFruitFormClick = false;
    } else {
        return;
    }

    const annotations = [
        {
            note: {
            title: "",
            label: "Use this dropdown to filter by fruit form. Click here to continue."
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
    .style("top", 50);
    svg.append("g")
    .attr("class", "annotation-group")
    .style("transform", "translateX(-150px)")
    .call(makeAnnotations);

    svg.on("click", function() {
        showRetailPriceSliderTooltip();
    });
}

function showResultsTooltip() {
    if (firstFruitResultsClick) {
        firstFruitResultsClick = false;
    } else {
        return;
    }

    d3.select('svg').remove();

    const annotations = [
        {
            note: {
            title: "",
            label: "Results below contain the fruit name and price. Click here to continue."
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
    .attr("height", 200)
    .style("position", "absolute")
    .style("transform", "translate(600px, 10px)")
    .style("top", "50px");
    svg.append("g")
    .style("transform", "translate(-120px, 20px)")
    .attr("class", "annotation-group")
    .call(makeAnnotations);

    svg.on("click", function() {
        d3.select("#fruitform").attr("disabled", null);
        d3.select("#retailPrice").attr("disabled", null);
        hideTooltip();
    });
}

function showRetailPriceSliderTooltip() {
    if (firstPriceSliderClick) {
        firstPriceSliderClick = false;
    } else {
        return;
    }

    d3.select('svg').remove();

    const annotations = [
        {
            note: {
            title: "",
            label: "Use this slider to filter by retail price. Click here to continue."
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
    .style("top", "50px");
    svg.append("g")
    .style("transform", "translateX(-120px)")
    .attr("class", "annotation-group")
    .call(makeAnnotations);

    svg.on("click", function() {
        showResultsTooltip();
    });
}

function hideTooltip() {
    d3.selectAll("svg").remove();
}