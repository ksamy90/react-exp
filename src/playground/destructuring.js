// const person = {
//     name,
//     age: 26,
//     location: {
//         city: 'Philadelphia',
//     }
// };

// const { name = 'Jen', age } = person;
// console.log(`${name} is ${age}`);

// const { city, temp: temperature = 50 } = person.location;

// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {}
// }

// const { name: publisherName = 'Self-published' } = book.publisher;
// console.log(publisherName);

// const address = ['1299 S Juniper Street', 'Buffalo'];
// const [, city, state = 'New York'] = address;
// console.log(`You are in ${city}, ${state}`);

const item = ['Coffee (iced)', '$2.50', '$3.00', '$3.25'];
const [coffee, , medium] = item;
console.log(`A medium ${coffee} costs ${medium}`);
