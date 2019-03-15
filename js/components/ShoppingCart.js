export default class ShoppingCart {
    constructor({element}) {
        this._element = element;

        this._state = {
            basket: [],
        }

        this._render();
    }

    _addToBasket(phone){
        this._state.basket.push(phone);
        this._render();
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