class Renderer {
    constructor() {
        this.cityTemplate = $('#city-template').html()
        this.citiesList = $('#citiesList')
        this.searchButton = $('#searchButton')
        this.cityInput = $('#cityInput')
        this.init = 0
    }

    renderCities(data) {
        this.citiesList.empty()
        const template = Handlebars.compile(this.cityTemplate)
        const html = template({ cities: data })
        this.citiesList.append(html)
        if(this.init == 0){
            this.attachSearchButtonHandler()
            this.init++
        }
        
        this.attachSaveButtonHandlers()
        this.attachRemoveButtonHandlers()
    }

    attachSaveButtonHandlers() {
        this.citiesList.on('click', '.saveButton', event => {
            const cityElement = $(event.target).closest('.card')
            const cityName = cityElement.find('.card-title').text()
            weatherController.handleSaveButton(cityName)
        })
    }

    attachRemoveButtonHandlers() {
        this.citiesList.on('click', '.removeButton', event => {
            const cityElement = $(event.target).closest('.card')
            const cityName = cityElement.find('.card-title').text()
            weatherController.handleRemoveButton(cityName)
        })
    }

    attachSearchButtonHandler() {
        this.searchButton.on('click', () => {
            const cityName = this.cityInput.val()
            weatherController.handleSearchButton(cityName)
        })
    }
}
