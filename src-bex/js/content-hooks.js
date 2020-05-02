// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

export default function attachContentHooks (bridge) {
  bridge.on('quasar.detect', event => {
    console.log('Quasar Detected!', event.data)
  })
}
