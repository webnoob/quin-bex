import GlobalQuasarBex from '@quasar/app/types/bex'

declare global {
  interface Window {
    QBexBridge: GlobalQuasarBex;
  }
}
