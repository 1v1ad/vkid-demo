
console.log('initOneTap.js стартует');
if ('VKIDSDK' in window) {
  console.log('VKIDSDK найден');
  VKIDSDK.Config.init({
    app: 53969710,
    redirectUrl: 'https://vkid-demo.vercel.app/api/vk/callback',
    responseMode: VKIDSDK.ConfigResponseMode.Callback,
    source: VKIDSDK.ConfigSource.LOWCODE
  });
  const oneTap = new VKIDSDK.OneTap();
  console.log('OneTap создан, пытаемся отрендерить');
  oneTap
    .render({
      container: document.getElementById('vkid-container'),
      showAlternativeLogin: true
    })
    .on(VKIDSDK.WidgetEvents.ERROR, (e) => {
      console.error('VK One Tap error', e);
    })
    .on(VKIDSDK.OneTapInternalEvents.LOGIN_SUCCESS, ({ code, device_id }) => {
      console.log('LOGIN_SUCCESS', { code, device_id });
      if (code && device_id) {
        window.location.href = `/api/vk/callback?code=${encodeURIComponent(code)}&device_id=${encodeURIComponent(device_id)}`;
      }
    });
} else {
  console.error('VKIDSDK не найден!');
}
