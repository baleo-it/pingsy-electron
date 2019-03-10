const { Tray, Menu, nativeImage, } = require('electron')

const path = require('path')

let tray

const TraySystem = {
    init: () => {
        tray = new Tray(path.join(__dirname, '../assets/icons/png/16x16.png'))
        const contextMenu = Menu.buildFromTemplate([
            { role: 'quit' },
        ])

        tray.setToolTip('Pingsy Electron')
        tray.setContextMenu(contextMenu)
    },
    update: items => {
        const updatedItems = items.map(item => ({
            type: 'normal',
            id: item.id,
            label: item.name,
            sublabel: item.url,
            icon: item.status === 'online'
                ? nativeImage.createFromPath(path.join(__dirname, '../assets/icons/png/online.png'))
                    : nativeImage.createFromPath(path.join(__dirname, '../assets/icons/png/offline.png')),
        }))

        const updatedMenu = Menu.buildFromTemplate(updatedItems)
        tray.setContextMenu(updatedMenu)
    }
}

module.exports = TraySystem
