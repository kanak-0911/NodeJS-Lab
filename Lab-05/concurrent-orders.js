// Lab-05: Food Delivery Tracker
// Task 6 - Concurrent Orders with Promise.all()

function placeOrder(item) {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 3000) + 1000;

        console.log(`Starting order: ${item}`);

        setTimeout(() => {
            resolve(`${item} is ready!`);
        }, delay);
    });
}

async function orderMultiple() {
    console.log('Placing 3 orders at once...');

    console.time('Total Time');

    const results = await Promise.all([
        placeOrder('Pizza'),
        placeOrder('Burger'),
        placeOrder('Coffee')
    ]);

    console.timeEnd('Total Time');

    console.log(results);
}

orderMultiple();