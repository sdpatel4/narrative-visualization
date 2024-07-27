function filterFreshFruits() {
    const jsonUrl = 'data.json';
    const freshFruits = [];

    d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            freshFruits.append(f);
        });
    });
    
    return freshFruits;
}