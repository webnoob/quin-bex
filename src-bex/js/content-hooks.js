// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

export default function attachContentHooks (bridge) {
  bridge.on('quasar.detect', event => {
    console.log('Quasar Detected!', event.data)
  })

  bridge.on('add.bookmark', event => {
    bridge.send('add.bookmark.bg', event.data).then(payload => {
      bridge.send(event.eventResponseKey, payload.data)
    })
  })

  bridge.on('remove.bookmark', event => {
    console.log('Removing CS: ', event.data)
    bridge.send('remove.bookmark.bg', event.data)
  })

  bridge.on('dom.bookmarks.bg', event => {
    bridge.send('dom.bookmarks', { ...event.data })
  })

  bridge.on('redirect.quasar.bg', event => {
    bridge.send('redirect.quasar', event.data)
  })
}
