import ReactGA from 'react-ga'

export const initializeDep = () => {

    if (process.env.NODE_ENV === 'production') {
        ReactGA.initialize('UA-167736503-3')
        ReactGA.pageview(window.location.pathname + window.location.search)
    }
}