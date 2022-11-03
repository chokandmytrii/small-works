import Vue from "vue/dist/vue.esm.browser";
import ratesNow from "./api";

const form = new Vue({
    el: '#form',
    data: {
        dollar: '',
        euro: '',
        currency1: 'USD',
        currency2: 'UAH',
        multiplier: 0,
        result1: '',
        result2: ''
    },
    methods: {
        counting() {
            if (this.currency1 === this.currency2) {
                return this.multiplier = 1;
            } else if (this.currency1 === 'UAH') {
                if (this.currency2 === 'USD') {
                    return this.multiplier = this.dollar
                } else {
                    return this.multiplier = this.euro
                }
            } else if (this.currency2 === 'UAH') {
                if (this.currency1 === 'USD') {
                    return this.multiplier = this.roundResult(1, this.dollar, 1e7, "/")
                } else {
                    return this.multiplier = this.roundResult(1, this.euro, 1e7, "/")
                }
            } else {
                if (this.currency1 === 'USD') {
                    return this.multiplier = this.roundResult(this.dollar, this.euro, 100, "/")
                } else {
                    return this.multiplier = this.roundResult(this.euro, this.dollar, 100, "/")
                }
            }
        },
        roundResult(value1, value2, multiplier, action) {
            let countingResult;
            if (action === "*") {
                countingResult = value1 * value2;
            } else if (action === "/") {
                countingResult = value1 / value2;
            } else {
                return false
            }
            const result = Math.round(countingResult * multiplier) / multiplier;
            return result
        },
        clearResults() {
            this.result1 = undefined;
            this.result2 = undefined;
        }
    },
    computed: {
        countMulti() {
            this.counting()
        }
    },
    mounted: function () {
        ratesNow().then(result => {
            this.dollar = result.USD;
            this.euro = result.EUR;
        })
    },
    watch: {
        result1() {
            this.result2 = this.roundResult(this.result1, this.multiplier, 100, "/")
        },
        result2() {
            this.result1 = this.roundResult(this.result2, this.multiplier, 100, "*")
        },
        currency1() {
            this.counting()
            this.result1 = this.roundResult(this.result2, this.multiplier, 100, "*")
        },
        currency2() {
            this.counting()
            this.result2 = this.roundResult(this.result1, this.multiplier, 100, "/")
        }
    }
})
