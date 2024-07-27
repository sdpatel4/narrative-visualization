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
            label: "Use this dropdown to update the fruit form"
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
    .attr("width", 148)
    .attr("height", 130)
    .style("position", "absolute")
    svg.append("g")
    .attr("class", "annotation-group")
    .style("transform", "translateX(-150px)")
    .call(makeAnnotations);
}