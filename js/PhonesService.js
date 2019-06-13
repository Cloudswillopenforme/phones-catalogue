const PhonesService = {
    async getAll() {
        const response = await fetch("phones/phones.json");
        const phonesFromServer = await response.json();
        return phonesFromServer;
    },

    async getById(phoneId) {
        const response = await fetch(`phones/${phoneId}.json`);
        const phoneDetails = await response.json();
        return phoneDetails;
    }
};

export default PhonesService;
