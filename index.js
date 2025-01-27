const jsonUrl = 'data.json';
const DEFAULT_FORM = "Filter by form";
let globalForm = DEFAULT_FORM;
let globalPrice = 4.2;
let isPriceTutorialClicked = false;
let isFormTooltipClicked = false;
let isResultsTooltipClicked = false;
let isOverviewTooltipClicked = false;

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
        .text(d => `${d.Fruit}`)
        .append("p")
        .text(d => `Price ${d.RetailPriceUnit}: ${d.RetailPrice}`);
    } else {
        container.html("");
        container.append("p")
        .text("No results match your filter criteria");
    }

    if (isTutorialComplete()) {
        d3.select("#subheader").remove();
        updateSubheaderText();
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

function showFirstTooltip() {
    if (isOverviewTooltipClicked) {
        return;
    } else {
        isOverviewTooltipClicked = true;
    }

    const annotations = [
        {
            note: {
            title: "",
            label: "The cost to stay healthy is very high. Let's find fruits in your budget with this tool. Click here to continue."
            },
            x: 200,
            y: 160,
            dy: 50,
            dx: 50
        }
    ];

    const makeAnnotations = d3.annotation()
    .annotations(annotations);

    const svg = d3.select("body")
    .append("svg")
    .attr("width", 300)
    .attr("height", 200)
    .style("position", "absolute")
    .style("transform", "translate(300px, 0)")
    .style("top", 50);
    svg.append("g")
    .attr("class", "annotation-group")
    .style("transform", "translate(-200px, -200px)")
    .call(makeAnnotations);

    svg.on("click", function() {
        showFormFruitTooltip();
    });
}

function showFormFruitTooltip() {
    if (isFormTooltipClicked) {
        return;
    } else {
        isFormTooltipClicked = true;
    }

    d3.select('svg').remove();

    const annotations = [
        {
            note: {
            title: "",
            label: "Fruit can come in many forms, filter by fruit form. Click here to continue."
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
    if (isResultsTooltipClicked) {
        return;
    } else {
        isResultsTooltipClicked = true;
    }

    d3.select('svg').remove();

    const annotations = [
        {
            note: {
            title: "",
            label: "Results below contain the fruit name and price per unit. Click here to continue."
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
        updateSubheaderText();
        d3.select("#toolbar").style("margin-top", "48px");
    });
}

function showRetailPriceSliderTooltip() {
    if (isPriceTutorialClicked) {
        return;
    } else {
        isPriceTutorialClicked = true;
    }

    d3.select('svg').remove();

    const annotations = [
        {
            note: {
            title: "",
            label: "Use this slider to explore fruits to avoid on a budget. Click here to continue."
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

function isTutorialComplete() {
    return isOverviewTooltipClicked && isResultsTooltipClicked && isPriceTutorialClicked && isFormTooltipClicked;
}

function updateSubheaderText() {
    let form = "";
    if (globalForm === DEFAULT_FORM) {
        form = "all fruits";
    } else if (globalForm === "Juice") {
        form = "juice";
    } else {
        form = `${globalForm} fruits`;
    }

    d3.select("h1")
    .append("h1")
    .text(`Showing ${form.toLowerCase()} below the price of $${globalPrice}`)
    .style("font-size", "24px")
    .attr("id", "subheader");
}

function hideTooltip() {
    d3.selectAll("svg").remove();
}