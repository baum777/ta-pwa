// Prod-only PWA registration with auto update
if (import.meta.env.PROD) {
  // dynamic import keeps dev builds clean
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - virtual module provided by vite-plugin-pwa
  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({
      immediate: true,
      onNeedRefresh() {
        // TODO: replace with soft prompt UI
        console.log('[PWA] Update available')
      },
      onOfflineReady() {
        console.log('[PWA] Offline ready')
      },
    })
  })
}
