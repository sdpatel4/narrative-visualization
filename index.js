async function filterFreshFruits() {
    const jsonUrl = 'data.json';
    const freshFruits = [];

    await d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            if (!f.Fruit.includes(",")) {
                freshFruits.push(f);
            }
        });
    });

    const container = d3.select("#container");
    container.selectAll("p")
    .data(freshFruits)
    .enter()
    .append("p")
    .text(d => `${d.Fruit}`);
    
    return freshFruits;
}