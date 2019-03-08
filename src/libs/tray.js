const path = require('path')
const electron = window.require('electron')
const { Menu, Tray, } = electron

class MenuTraySystem {
	defaultMenuItems = [
		{ label: 'Item1', type: 'normal' },
		{ label: 'Item2', type: 'normal' },
		{ label: 'Item3', type: 'normal' },
		{ label: 'Item4', type: 'normal' },
	]

	constructor(iconPath) {
		this.tray = new Tray(iconPath)
	}

	init = () => {
		this.setToolTip('Pingsy Electron - Loading...')
		this.setMenu(this.defaultMenuItems)
	}

	setToolTip = tooltip => this.tray.setToolTip(tooltip)

	setMenu = (menuItems) => {
		const menu = Menu.buildFromTemplate(menuItems)
		this.tray.setContextMenu(menu)
	}
}

const icon = path.join(__dirname, '../assets/icons/png/16x16.png')
const TraySystem = new MenuTraySystem(icon)

export { TraySystem }
