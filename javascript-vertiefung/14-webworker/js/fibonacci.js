self.onmessage = event => {

    let n = event.data;

    let a = 0, b = 1, sum = 0;

    if (n < 0) return NaN;
    if (n < 2) return n;

    while (n > 1) {
        sum = a + b;
        a = b;
        b = sum;
        n = n - 1;
    }

    postMessage({
        result: sum,
        iteration: event.data - n,
    })

};