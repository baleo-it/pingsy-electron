import React, { Component, createContext, } from 'react'
import { Ping } from './libs/pinger';

const WebsitesContext = createContext({
    websites: [],
    addWebsite: () => {},
    removeWebsite: () => {},
})

class WebsitesProvider extends Component {
    state = {
        websites: [],
        addWebsite: ({ name, url }) => {
            this.setState(prevState => ({
                websites: [
                    ...prevState.websites,
                    {
                        id: prevState.websites.length + 1,
                        name,
                        url,
                        status: 'unknown',
                        responseTime: 0,
                    }
                ]
            }))
        },
        removeWebsite: websiteId => {
            this.setState(prevState => {
              const websitesWithoutSelectedItem = prevState.websites.filter(website => website.id !== websiteId)

              return {
                  websites: websitesWithoutSelectedItem,
              }
            })
        },
    }

    componentDidMount() {
        this.statusCheckSystem = setInterval(async () => {
            const { websites } = this.state

            if (websites.length) {
                const promises = websites.map(async (website) => {
                    try {
                        const res = await Ping(website.url)

                        if (res.status === 'online') {
                            return {
                                ...website,
                                ...res,
                            }
                        }
                    } catch (e) {
                        if (e.status === 'timeout' || e.status === 'offline') {
                            return {
                                ...website,
                                ...e,
                            }
                        }
                    }
                })

                const updatedWebsites = await Promise.all(promises)
                this.updateWebsites(updatedWebsites)
            }
        }, 5000)
    }

    componentWillUnmount() {
        if (this.statusCheckSystem) {
            clearInterval(this.statusCheckSystem)
        }
    }

    updateWebsites = updatedWebsites => {
        this.setState({ websites: updatedWebsites })
    }

    render() {
        const { children } = this.props

        return (
            <WebsitesContext.Provider value={this.state}>
                {children}
            </WebsitesContext.Provider>
        )
    }
}

const withWebsites = Component => props => (
    <WebsitesContext.Consumer>
        {store => <Component {...props} {...store} />}
    </WebsitesContext.Consumer>
)

export {
    withWebsites,
    WebsitesProvider,
}