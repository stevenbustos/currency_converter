const assert = require('chai').assert;
const axios = require('axios');

describe('Testing the /convert endpoint', function () {

    // Testing from COP to USD
    it('COP TO USD', function () {
        axios
            .get("http://localhost:10000/convert", {
                params: {
                    from_currency: "COP",
                    to_currency: "USD",
                    money_amount: 200000
                }
            })
            .then(response => {
                let result = response.data.data.result;
                assert.equal(result, 64.62556218956954);
            })
            .catch(error => {
                console.log(error);
            });
    });

    // Testing from EUR to EUR
    it('EUR TO EUR', function () {
        axios
            .get("http://localhost:10000/convert", {
                params: {
                    from_currency: "EUR",
                    to_currency: "EUR",
                    money_amount: 200000
                }
            })
            .then(response => {
                let result = response.data.data.result;
                assert.equal(result, 200000);
            })
            .catch(error => {
                console.log(error);
            });
    });

    // The from currency doesn't exist
    it('From currency dont exist - VES to COP', function () {
        axios
            .get("http://localhost:10000/convert", {
                params: {
                    from_currency: "VES",
                    to_currency: "COP",
                    money_amount: 200000
                }
            })
            .then(response => {
                let result = response.data.data.result;
                assert.equal(result, false);
            })
            .catch(error => {
                console.log(error);
            });
    });

    // The to currency doesn't exist
    it('To currency dont exist - COP to VES', function () {
        axios
            .get("http://localhost:10000/convert", {
                params: {
                    from_currency: "COP",
                    to_currency: "VES",
                    money_amount: 200000
                }
            })
            .then(response => {
                let result = response.data.data.result;
                assert.equal(result, false);
            })
            .catch(error => {
                console.log(error);
            });
    });

    // From currency missing
    it('From currency missing', function () {
        axios
            .get("http://localhost:10000/convert", {
                params: {
                    to_currency: "COP",
                    money_amount: 200000
                }
            })
            .then(response => {
                let result = response.data.data.result;
                assert.equal(result, false);
            })
            .catch(error => {
                console.log(error);
            });
    });

    // To currency missing
    it('To currency missing', function () {
        axios
            .get("http://localhost:10000/convert", {
                params: {
                    from_currency: "USD",
                    money_amount: 200000
                }
            })
            .then(response => {
                let result = response.data.data.result;
                assert.equal(result, false);
            })
            .catch(error => {
                console.log(error);
            });
    });

    // Amount is missing
    it('Amount is missing', function () {
        axios
            .get("http://localhost:10000/convert", {
                params: {
                    from_currency: "USD",
                    to_currency: "COP"
                }
            })
            .then(response => {
                let result = response.data.data.result;
                assert.equal(result, false);
            })
            .catch(error => {
                console.log(error);
            });
    });
});