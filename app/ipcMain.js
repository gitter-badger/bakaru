'use strict';

const FolderReader = require('./lib/FolderReader');
const main = require('./lib/events').main;
const renderer = require('./lib/events').renderer;

/**
 * @param {App} app
 */
module.exports = (app) => {
  app.ipc.on(main.minimizeMainWindow, () => {
    app.mainWindow.minimize();
  });

  app.ipc.on(main.openSelectFolderDialog, event => {
    event.sender.send(renderer.flagAddAnimeFolderStart);

    app.dialog.showOpenDialog(
      app.mainWindow,
      {
        properties: [
          'openDirectory',
          'multiSelections'
        ]
      },
      itemsPaths => {
        if (itemsPaths) {
          const fr = new FolderReader(
            animeFolder => event.sender.send(renderer.addAnimeFolder, animeFolder),
            animeFolder => event.sender.send(renderer.updateAnimeFolder, animeFolder)
          );

          itemsPaths.map(itemPath => {
            fr.findAnime(itemPath)
              .catch(err => {
                app.dialog.showErrorBox('No anime found :c', `${err}`);
              })
              .finally(() => {
                event.sender.send(renderer.flagAddAnimeFolderEnd);
              });
          });
        } else {
          event.sender.send(renderer.flagAddAnimeFolderEnd);
        }
      }
    );
  });
};
