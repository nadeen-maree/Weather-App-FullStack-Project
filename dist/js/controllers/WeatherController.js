class WeatherController {
    constructor(model, view) {
        this.model = model
        this.view = view
    }

    async renderSavedData() {
        await this.model.getAllCitiesFromServer()
        this.view.renderCities(this.model.serverData)
    }

    async renderNewWeatherData(cityName) {
        const cityData = await this.model.getCityDataFromServer(cityName)
        if (cityData) {
            this.view.renderCities(this.model.serverData)
        } else {
            console.log('City data not available.')
        }
    }

    handleSearchButton(cityName) {
        this.renderNewWeatherData(cityName)
    }

    async handleSaveButton(cityName) {
        const cityData = this.model.serverData.find(city => city.name === cityName)

        if (cityData) {
            await this.model.saveCityToDB(cityData)
            this.view.renderCities(this.model.serverData)
        } else {
            console.log('City already saved or data not available.')
        }
    }

    handleRemoveButton(cityName) {
        this.model.deleteCityFromDB(cityName)
        this.renderSavedData()
    }
}