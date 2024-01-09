class WeatherModel {
    constructor() {
        this.serverData = []
        this.savedData = []
    }

    async getAllCitiesFromServer() {
        try {
            const response = await fetch('/cities')
            this.serverData = await response.json()
            this.serverData.forEach(s => s["isSaved"] = true)
        } catch (error) {
            console.error('Error fetching cities:', error)
        }
    }

    async getCityDataFromServer(cityName) {
        try {
            const response = await fetch(`/weather/${cityName}`)
            const cityData = await response.json()

            if (cityData){
                cityData["isSaved"] = false
                this.serverData.push(cityData)
            }
            return cityData
        } catch (error) {
            console.error(`Error fetching data for ${cityName}:`, error)
            return null
        }
    }

    async saveCityToDB(cityData) {
        try {
            const response = await fetch('/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityData),
            })
            const savedCity = await response.json()

            cityData["isSaved"] = true
            
            return savedCity
        } catch (error) {
            console.error('Error saving city:', error)
            return null
        }
    }

    async deleteCityFromDB(cityName) {
        try {
            await fetch(`/cities/${cityName}`, {
                method: 'DELETE',
            })
            const city = this.serverData.find(s => s.name == cityName)
            city["isSaved"] = false
        } catch (error) {
            console.error(`Error deleting ${cityName}:`, error)
        }
    }
}

