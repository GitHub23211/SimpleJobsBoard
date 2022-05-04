/*  Joshua Santos
    45203083
    Main.js
    Controller module of the website
*/

import {Router} from './router.js'
import {Model} from './model.js'
import {View} from './view.js'
import {userAuth} from './userAuth.js'

const router = new Router(View.errorView)
const jobsInfo = new Model(`http://localhost:1337/api/jobs?populate=*`)
const compInfo = new Model(`http://localhost:1337/api/companies?populate=*`)

window.addEventListener("modelUpdated", () => {
    let jobs = jobsInfo.data
    let companies = compInfo.data

    router.get('/', () => {
        View.homeView(jobs)
    })

    router.get('/#', () => {
        View.homeView(jobs)
    })
    
    router.get('/about', () => {
        View.aboutView()
    })
    
    router.get('/help', () => {
        View.helpView();
    })

    router.get('/jobs', (pathInfo) => {
        const findEntry = (data) => {
            return pathInfo.id == data.id
        }

        View.jobView(jobs, jobs.findIndex(findEntry))
    })

    router.get('/companies', (pathInfo) => {
        const findEntry = (data) => {
            return pathInfo.id == data.id
        }

        View.companyView(companies, companies.findIndex(findEntry))
    })

    router.get('/search', (pathInfo) => {
        View.searchView(jobsInfo.searchEntries(pathInfo.id), pathInfo.id)
    })

    View.loginView()

    router.route()
    bindings()
})

const searchJobs = function() {
    event.preventDefault()
    jobsInfo.changeHash(this.elements[0].value)
}

const auth = function () {
    event.preventDefault()
    const authInfo = {
       identifier: this.elements['username'].value,
       password: this.elements['password'].value 
    }
    userAuth.login(authInfo)
}

const bindings = function() {
    let searchForm = document.getElementById("search-form")
    searchForm.onsubmit = searchJobs

    let loginForm = document.getElementById("login-form")
    loginForm.onsubmit = auth
}

window.onload = () => {
    jobsInfo.fetchData()
    compInfo.fetchData()
}