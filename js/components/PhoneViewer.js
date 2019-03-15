export default class PhoneViewer {
    constructor({element, onBackClicked, addToBasket}) {
        this._element = element;

        this._props = {
            phone: null,
            onBackClicked: onBackClicked,
            addToBasket: addToBasket,
        };

        this._initEventListeners();
    }

    show(phone) {

        this._props.phone = phone;
        this._element.hidden = false;
        this._render();
    }

    hide() {
        this._element.hidden = true;
        this._props.phone = null;
    }

    _showThumbnail(src, title) {
        document.querySelector("#largeImg").src = src;
        document.querySelector("#largeImg").title = title;
    }

    _initEventListeners() {
        this._element.addEventListener('click', (event) => {
            const backLink = event.target.closest('[data-element="backLink"]');

            if (!backLink) return;

            this._props.onBackClicked();

        });

        this._element.addEventListener('click', (event) => {
            const smallImg = event.target.closest('img[title^="image"]');

            if(!smallImg) return;

            this._showThumbnail(smallImg.src, smallImg.title);

        });

        this._element.addEventListener('click', (event) => {
            if (event.target.closest(".phone-viewer__basket-button")) {
                this._props.addToBasket(this._props.phone);
            }

        });

    }

    _render() {

        const { phone } = this._props;

        this._element.innerHTML = `
        
    <p>

    <img id="largeImg" title="image0" class="phone" src="${phone.images[0]}">

    <button data-element="backLink">Back</button>
    <button class="phone-viewer__basket-button">Add to basket</button>


    <h1>${phone.name}</h1>

    <p>${phone.description}</p>
    <ul class="phone-thumbs">
      <li>
        <img src="${phone.images[0]}" title="image0">
      </li>
      <li>
        <img src="${phone.images[1]}" title="image1">
      </li>
      <li>
        <img src="${phone.images[2]}" title="image2">
      </li>
      <li>
        <img src="${phone.images[3]}" title="image3">
      </li>
      <li>
        <img src="${phone.images[4]}" title="image4">
      </li>
      <li>
        <img src="${phone.images[5]}" title="image5">
      </li>
      
    </ul>

    <ul class="specs">
      <li>
        <span>Availability and Networks</span>
        <dl>
          <dt>Availability</dt>
          <dd>${phone.availability}</dd>
        </dl>
      </li>
      <li>
        <span>Battery</span>
        <dl>
          <dt>Type</dt>
          <dd>${phone.battery.type}</dd>
          <dt>Talk Time</dt>
          <dd>${phone.battery.talkTime}</dd>
          <dt>Standby time (max)</dt>
          <dd>${phone.battery.standbyTime}</dd>
        </dl>
      </li>
      <li>
        <span>Storage and Memory</span>
        <dl>
          <dt>RAM</dt>
          <dd>${phone.storage.ram}</dd>
          <dt>Internal Storage</dt>
          <dd>${phone.storage.flash}</dd>
        </dl>
      </li>
      <li>
        <span>Connectivity</span>
        <dl>
          <dt>Network Support</dt>
          <dd>${phone.connectivity.cell}</dd>
          <dt>WiFi</dt>
          <dd>${phone.connectivity.wifi}</dd>
          <dt>Bluetooth</dt>
          <dd>${phone.connectivity.bluetooth}</dd>
          <dt>Infrared</dt>
          <dd>${phone.connectivity.infrared  ? `
                ✓` : `
                ✘`}</dd>
          <dt>GPS</dt>
          <dd>${phone.connectivity.gps  ? `
                ✓` : `
                ✘`}</dd>
        </dl>
      </li>
      <li>
        <span>Android</span>
        <dl>
          <dt>OS Version</dt>
          <dd>${phone.android.os}</dd>
          <dt>UI</dt>
          <dd>${phone.android.ui}</dd>
        </dl>
      </li>
      <li>
        <span>Size and Weight</span>
        <dl>
          <dt>Dimensions</dt>
          <dd>${phone.sizeAndWeight.dimensions[0]}</dd>
          <dd>${phone.sizeAndWeight.dimensions[1]}</dd>
          <dd>${phone.sizeAndWeight.dimensions[2]}</dd>
          <dt>Weight</dt>
          <dd>${phone.sizeAndWeight.weight}</dd>
        </dl>
      </li>
      <li>
        <span>Display</span>
        <dl>
          <dt>Screen size</dt>
          <dd>${phone.display.screenSize}</dd>
          <dt>Screen resolution</dt>
          <dd>${phone.display.screenResolution}</dd>
          <dt>Touch screen</dt>
          <dd>${phone.display.touchScreen ? `
                ✓` : `
                ✘`}</dd>
        </dl>
      </li>
      <li>
        <span>Hardware</span>
        <dl>
          <dt>CPU</dt>
          <dd>${phone.hardware.cpu}</dd>
          <dt>USB</dt>
          <dd>${phone.hardware.usb}</dd>
          <dt>Audio / headphone jack</dt>
          <dd>${phone.hardware.audioJack}</dd>
          <dt>FM Radio</dt>
          <dd>${phone.hardware.fmRadio  ? `
                ✓` : `
                ✘`}</dd>
          <dt>Accelerometer</dt>
          <dd>${phone.hardware.accelerometer  ? `
                ✓` : `
                ✘`}</dd>
        </dl>
      </li>
      <li>
        <span>Camera</span>
        <dl>
          <dt>Primary</dt>
          <dd>${phone.camera.primary}</dd>
          <dt>Features</dt>
          <dd>${phone.camera.features}</dd>
        </dl>
      </li>
      <li>
        <span>Additional Features</span>
        <dd>${phone.additionalFeatures}</dd>
      </li>
    </ul>
  </div>
    
        `;
    }
};