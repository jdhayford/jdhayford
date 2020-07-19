import ReactGA from 'react-ga'

export const logSelectSearchResult = (query) => {
    ReactGA.event({
        category: 'Engagement',
        action: 'Selected a search result',
        label: query
    })
}

export const logAddProgression = (chordName) => {
    ReactGA.event({
        category: 'Engagement',
        action: 'Added a chord progression',
        label: chordName
    })
}

export const logToggleFocus = (chordName) => {
    ReactGA.event({
        category: 'Engagement',
        action: 'Toggled chord focus',
        label: chordName
    })
}

export const logChangeChordVersion = (chordName) => {
    ReactGA.event({
        category: 'Engagement',
        action: 'Changed chord version in a progression'
    })
}
  