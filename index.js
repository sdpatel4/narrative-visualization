const jsonUrl = 'data.json';

async function filterFruitByForm(form) {
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