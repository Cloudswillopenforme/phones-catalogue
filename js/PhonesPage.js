import PhonesList from "./components/PhonesList.js";
import ShoppingCart from "./components/ShoppingCart.js";
import Filter from "./components/Filter.js";
import PhoneViewer from "./components/PhoneViewer.js";
import PhonesService from "./PhonesService.js";

export default class PhonesPage {
    constructor({ element }) {
        this._element = element;

        this._state = {
            phones: null,
            selectedPhone: null
        };

        this.getPhones();
        this._render();
        this._initCart();
        this._initFilter();
        this._initViewer();
    }

    getPhones = async () => {
        const phones = await PhonesService.getAll();
        this._state.phones = phones;
        this._initList();
    };

    _initList() {
        this._list = new PhonesList({
            element: this._element.querySelector('[data-component="PhonesList"]'),
            phones: this._state.phones,
            onPhonesSelected: async phoneID => {
                const selectedPhone = await PhonesService.getById(phoneID);

                this._list.hide();
                this._viewer.show(selectedPhone);
            },

            addToBasket: async phone => {
                const selectedPhone = await PhonesService.getById(phone);
                this._cart._addToBasket(selectedPhone);
            }
        });
    }

    _initCart() {
        this._cart = new ShoppingCart({
            element: this._element.querySelector('[data-component="ShoppingCart"]')
        });
    }

    _initFilter() {
        this._filter = new Filter({
            element: this._element.querySelector('[data-component="Filter"]')
        });
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="PhoneViewer"]'),
            onBackClicked: () => {
                this._viewer.hide();
                this._list.show();
            },

            addToBasket: async phone => {
                const selectedPhone = await PhonesService.getById(phone);
                this._cart._addToBasket(selectedPhone);
            }
        });
    }

    _render() {
        this._element.innerHTML = `
        
            <div class="row">

                <!--Sidebar-->
                <div class="col-md-2">
                    <section>
                        <div data-component="Filter"></div>
                    </section>
    
                    <section>
                        <div data-component="ShoppingCart"></div>
                    </section>
                </div>
    
                <!--Main content-->
                <div class="col-md-10">
                   
                    <div data-component="PhoneViewer" hidden></div>
                    <div data-component="PhonesList"></div>
                    
                </div>
            </div>
            
        `;
    }
}
