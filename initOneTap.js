
if ('VKIDSDK' in window) {
  const VKID = window.VKIDSDK;

  VKID.Config.init({
    app: 53969710,
    redirectUrl: 'https://pvp-chance.vercel.app/api/vk/callback',
    responseMode: VKID.ConfigResponseMode.Callback,
    source: VKID.ConfigSource.LOWCODE,
    scope: ''
  });

  const oneTap = new VKID.OneTap();
  oneTap.render({
    container: document.getElementById('vk_button'),
    showAlternativeLogin: true
  })
  .on(VKID.WidgetEvents.ERROR, console.error)
  .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, (payload) => {
    console.log('VKID code:', payload.code);
    window.location.href = `/api/vk/callback?code=${payload.code}`;
  });
}
