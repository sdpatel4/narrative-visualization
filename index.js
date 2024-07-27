function filterFreshFruits() {
    const jsonUrl = 'data.json';
    const freshFruits = [];

    d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            if (!f.Fruit.includes(",")) {
                freshFruits.push(f);
            }
        });
    });
    
    return freshFruits;
}