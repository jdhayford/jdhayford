import ReactGA from 'react-ga'

export const initializeDep = () => {

    if (process.env.NODE_ENV === 'production') {
        ReactGA.initialize()
        ReactGA.pageview(window.location.pathname + window.location.search)
    }
}