import {
    createApp
} from 'vue/dist/vue.esm-browser'
import
bookResult
from './api';
import bookSearch from './searchApi';

const bookshellVm = createApp({
    data() {
        return {
            title: 'Bookshell!',
            booksNumb: 12,
            booksStart: 0,
            subject: 'love',
            search: '',
            htmlBookList: [],
            updatingTopic: true,
            genres: ['Love', 'Fiction', 'History', 'Romance', 'Detective', 'Classics', 'Drama', 'Comedy', 'Fantasy', 'Adventure', 'Philosophy'],
            basketList: [],
            contentOnScreen: true,
            pageLoading: false,
        }
    },
    methods: {
        async addBooks() {
            const moreLoader = document.querySelector(".bookshell__btn_loader");
            this.booksStart = this.booksNumb;
            this.booksNumb += 12;
            if (!this.updatingTopic) {
                setTimeout(() =>
                    moreLoader.classList.add("loader__active"), bookSearch(this.search, this.booksNumb, this.booksStart).then(result => {
                        moreLoader.classList.remove("loader__active");
                        result.forEach(element => {
                            this.htmlBookList.push(element);
                        });
                    }));
            } else {
                setTimeout(() =>
                    moreLoader.classList.add("loader__active"), bookResult(this.subject, this.booksNumb, this.booksStart).then(result => {
                        moreLoader.classList.remove("loader__active");
                        result.forEach(element => {
                            this.htmlBookList.push(element);
                        });
                    }))
            }
        },
        async getSubject(event) {
            const formControl = document.querySelector(".form-control");
            formControl.value = '';
            this.subject = event.target.textContent.toLowerCase();
            this.booksNumb = 12;
            this.pageLoading = true;
            bookResult(this.subject, this.booksNumb).then(result => {
                this.htmlBookList.splice(0, this.htmlBookList.length);
                result.forEach(element => {
                    this.htmlBookList.push(element);
                });
                this.updatingTopic = true;
                this.pageLoading = false;
            });
        },
        async getSearchValue(event) {
            console.log(event.target.firstChild.value);
            if (event.target.firstChild.value === '') {
                return;
            }
            this.search = event.target.firstChild.value.replace(/ /g, '+');
            this.booksNumb = 12;
            this.pageLoading = true;
            bookSearch(this.search, this.booksNumb).then(result => {
                this.htmlBookList.splice(0, this.htmlBookList.length);
                result.forEach(element => {
                    this.htmlBookList.push(element);
                });
                this.updatingTopic = false;
                this.pageLoading = false;
            });
        },
        getBook(value) {
            return this.basketList.find(data => data.id === value);
        },
        addToBasket(value) {
            const alreadyInBasket = this.getBook(value.id)

            if (alreadyInBasket) {
                alreadyInBasket.quantity++;
            } else {
                let newValue = Object.assign({}, value);
                const newCover = newValue.cover.replace('M', 'S');
                newValue.cover = newCover;
                newValue.quantity = 1;
                this.basketList.push(newValue);
            }
        },
        addBook(value) {
            value.quantity++;
        },
        getBookId(value) {
            return this.basketList.findIndex(data => data.id === value);
        },
        removeBook(value) {
            const index = this.getBookId(value.id)
            if (index === -1) return;

            if (value.quantity === 1) {
                this.basketList.splice(index, 1);
            } else {
                value.quantity--;
            }
        },
        countFinResult() {
            let finResult = 0;
            const result = this.basketList.map(element => element.quantity);
            result.forEach(element => {
                finResult += element;
            })
            return finResult * 12;
        },
        changeContent() {
            this.contentOnScreen = !this.contentOnScreen
            localStorage.setItem('contentOnScreen', this.contentOnScreen)
        },
        checkCartForm() {
            const cartInputs = document.querySelectorAll(".contact-form__input");

            if (cartInputs[0].value === '') {
                cartInputs[0].classList.add('contact-form__input_invalid');
            } else {
                cartInputs[0].classList.contains('contact-form__input_invalid') && cartInputs[0].classList.remove('contact-form__input_invalid')
            }

            if (/.([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{1,6})./.test(cartInputs[1].value)) {
                cartInputs[1].classList.contains('contact-form__input_invalid') && cartInputs[1].classList.remove('contact-form__input_invalid')
            } else {
                cartInputs[1].classList.add('contact-form__input_invalid');
            }

            const cartSlide = document.querySelector(".cart-slide");

            if (cartInputs[0].classList.contains('contact-form__input_invalid') || cartInputs[1].classList.contains('contact-form__input_invalid')) {
                return
            } else {
                cartSlide.classList.add('cart-slide_active');
                cartInputs[0].value = '';
                cartInputs[1].value = '';
                setTimeout(() => cartSlide.classList.remove('cart-slide_active'), 5000);
            }
        },
    },
    computed: {
        checkBasket() {
            if (this.basketList.length > 0) {
                return true
            } else {
                return false
            }
        },
    },
    beforeMount: async function () {
        bookResult(this.subject, this.booksNumb).then(result => {
            result.forEach(element => {
                this.htmlBookList.push(element);
            })
        });
    },
    mounted: function () {
        this.contentOnScreen = JSON.parse(localStorage.getItem('contentOnScreen')) || true;
        this.basketList = JSON.parse(localStorage.getItem('basket')) || [];
    },
    updated: function () {
        localStorage.setItem('basket', JSON.stringify(this.basketList))
    },
    watch: {}
})

bookshellVm.mount('#bookshell');
