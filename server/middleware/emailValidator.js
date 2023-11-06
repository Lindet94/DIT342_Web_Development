const axios = require("axios");

module.exports = {
    validateEmail: async (email) => {
        const options = {
            method: "GET",
            url:
                "https://email-verifier-completely-free.p.rapidapi.com/email-verification/" +
                email,
            headers: {
                "X-RapidAPI-Key":
                    "8f9d37f5a8mshbfed549b0ca7419p1ab1e2jsn83cdc79540a2",
                "X-RapidAPI-Host": "email-verifier-completely-free.p.rapidapi.com",
            },
        };
        try {
            const response = await axios.request(options)
            console.log(response.data.response)
            if(response.data.response.email_status === "Yes" || response.data.response.professional === "Yes" || response.data.response.format === "Yes"){
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }

    }
};


//response.data.response.email_status
