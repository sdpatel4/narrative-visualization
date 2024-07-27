function filterFreshFruits() {
    const jsonUrl = 'data.json';
    const freshFruits = [];

    d3.json(jsonUrl).then(function(data) {
        data.forEach(f => {
            console.log(f);
            console.log(f.Fruit);
            console.log(!f.Fruit.includes(","));
            if (!f.Fruit.includes(",")) {
                freshFruits.push(f);
            }
        });
    });
    
    return freshFruits;
}