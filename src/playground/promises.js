const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Andrew',
            age: 26
        });
        // reject('Something went wrong');
    }, 5000);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my other promise');
        }, 5000);
    });
}).then((str) => {
    return str;
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});

console.log('after');
