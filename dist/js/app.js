const weatherModel = new WeatherModel()
const renderer = new Renderer()
const weatherController = new WeatherController(weatherModel, renderer)

async function init() {
    await weatherController.renderSavedData()
}

init()