export {userAuth}

const userAuth = {
    userData: null,

    login: function(authInfo) {
        fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authInfo)
            }
        )
        .then( 
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                if(data.error) {
                    window.alert("Invalid username or password")
                }
                else {
                    console.log("User logged in")
                    this.userData = data
                    window.dispatchEvent(new CustomEvent("modelUpdated"))
                }
            }
        )
    },

    getJWT: function() {

    },

    getUser: function() {
        if(this.userData) {
            return true
        }
        return false
    }
}