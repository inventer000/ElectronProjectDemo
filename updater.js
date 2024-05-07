
// Electron-Updater Module
const { dialog } = require("electron")
const { autoUpdater } = require("electron-updater")

// Configure log debugging
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

// Disable auto downloading of updates
autoUpdater.autoDownload = false


// Single export to check for and apply any available updates
module.exports = () => {

    // Check for upate (GH releases)
    autoUpdater.checkForUpdates()
    // autoUpdater.checkForUpdatesAndNotify()
    // console.log('Checking for updates')

    // Listen for update found
    autoUpdater.on('update-available', () => {

        // Prompt user to start download
        dialog.showMessageBox({
            type: 'info',
            title: 'Update available',
            message: "A new version of Readit is available. Do you want to update now?",
            buttons: ["Update", "No"]
        }).then(result => {

            let buttonIndex = result.response

            // if button 0 (update), start downloading the update
            if(buttonIndex === 0) autoUpdater.downloadUpdate()
        })
    })

    // Listen for udpate downloaded
    autoUpdater.on('update-downloaded', () => {

        // Prompt the user to install the udpate
        dialog.showMessageBox({
            type: 'info',
            title: 'Update ready',
            message: 'Install & restart now?',
            buttons: ['Yes', 'Later']
        }).then(result => {

            let buttonIndex = result.response

            // Install & restart if the button 0 (Yes)
            if(buttonIndex === 0) autoUpdater.quitAndInstall(false, true)
        })

    })
}
