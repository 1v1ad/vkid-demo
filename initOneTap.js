if ('VKIDSDK' in window) {
  const VKID = window.VKIDSDK;

  VKID.Config.init({
    app: 53969710,
    redirectUrl: 'https://pvp-chance.vercel.app/api/vk/callback',
    responseMode: VKID.ConfigResponseMode.Callback,
    source: VKID.ConfigSource.LOWCODE
  });

  const oneTap = new VKID.OneTap();
  oneTap.render({
    container: document.body,
    showAlternativeLogin: true
  })
  .on(VKID.WidgetEvents.ERROR, function (e) {
    console.error('VKID error:', e);
  })
  .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
    if (payload && payload.code) {
      const redirect = 'https://pvp-chance.vercel.app/api/vk/callback?code=' + encodeURIComponent(payload.code);
      window.location.href = redirect;
    }
  });
}
