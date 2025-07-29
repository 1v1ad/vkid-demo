if ('VKIDSDK' in window) {
  const VKID = window.VKIDSDK;

  VKID.Config.init({
    app: 53969710,
    redirectUrl: 'https://vkid-demo.vercel.app/api/vk/callback',
    responseMode: VKID.ConfigResponseMode.Callback,
    source: VKID.ConfigSource.LOWCODE
  });

  const oneTap = new VKID.OneTap();
  oneTap
    .render({
      container: document.getElementById('vkid-container'),
      showAlternativeLogin: true
    })
    .on(VKID.WidgetEvents.ERROR, console.error)
    .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, ({ code, device_id }) => {
      if (code && device_id) {
        window.location.href = `/api/vk/callback?code=${encodeURIComponent(code)}&device_id=${encodeURIComponent(device_id)}`;
      }
    });
}