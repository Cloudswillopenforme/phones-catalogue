export default class ShoppingCart {
    constructor({element}) {
        this._element = element;

        this._state = {
            basket: [],
        }

        this._render();
        this._initEventListener();
    }

    _addToBasket(phone){
        this._state.basket.push(phone);
        this._render();
    }

    _initEventListener() {
        this._element.addEventListener('click', (event) => {
            if (event.target.closest('.basket__delete-btn')) {
                let name = event.target.closest(".basket__elem").querySelector(".basket__elem_name").innerText;
                let phoneIndex = this._state.basket.findIndex(phone =>
                    phone.name === name
                )
                this._state.basket.splice(phoneIndex, 1);
                this._render();
            }
        });
    }

    _getBasketElements(){

        return (this._state.basket.map((phone) =>
            `
            <div class='basket__elem'>
            <li class='basket__elem_name'>
            ${phone.name}
            </li>
            <button class='basket__delete-btn'>
            X
            </button>
            </div>
            `
        ).join(''))

    }

    _render() {
        let basketList = this._state.basket.length
            ? this._getBasketElements()
            : `<li>Add goods here</li>`;

        this._element.innerHTML = `
        <div>
        <p>Shopping Cart</p>
                    <ul class="basket">
                        ${basketList}
                    </ul>
        </div>
        `;
    }
}