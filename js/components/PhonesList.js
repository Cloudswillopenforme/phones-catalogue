export default class PhonesList {
    constructor({element, phones, onPhonesSelected}) {
        this._element = element;

        this._props = {
            phones: phones,
            onPhonesSelected: onPhonesSelected,
        };


        this._render();
        this._initEventListeners();

    }

    hide() {
        this._element.hidden = true;
    }

    show() {
        this._element.hidden = false;
    }


    _initEventListeners() {

        this._element.addEventListener('click', (event) => {
            const detailsLink = event.target.closest('[data-element="DetailsLink"]');

            if (!detailsLink) return;



            this._props.onPhonesSelected(detailsLink.dataset.phoneId);

        });
    }


    _render() {
        this._element.innerHTML = `
        <ul class="phones">
        ${ this._props.phones.map(phone => `
                    <li class="thumbnail">
                        <a 
                            data-element="DetailsLink"
                            data-phone-id="${phone.id}"
                            href="#!/phones/${phone.id}" 
                            class="thumb"
                        >
                            <img alt="${phone.name}" src="${phone.imageUrl}">
                        </a>

                        <div class="phones__btn-buy-wrapper">
                            <a class="btn btn-success">
                                Add
                            </a>
                        </div>

                        <a 
                            data-element="DetailsLink"
                            data-phone-id="${phone.id}"
                            href="#!/phones/${phone.id}"
                        >
                            ${phone.name}
                        </a>
                        <p>${phone.snippet}</p>
                    </li>       
            `)
            .join(``)}
        </ul>
      `;
    }
}