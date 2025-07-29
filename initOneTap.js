if ('VKIDSDK' in window) {
  const VKID = window.VKIDSDK;

  VKID.Config.init({
    app: 53969710,
    redirectUrl: 'https://vkid-demo.vercel.app/api/vk/callback',
    responseMode: VKID.ConfigResponseMode.Callback,
    source: VKID.ConfigSource.LOWCODE,
    scope: '',
  });

  const oneTap = new VKID.OneTap();

  oneTap.render({
    container: document.body,
    showAlternativeLogin: true,
    oauthList: ['mail_ru']
  })
  .on(VKID.WidgetEvents.ERROR, (error) => {
    console.error("VKIDSDK error:", error);
  })
  .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, (payload) => {
    const code = payload.code;
    const deviceId = payload.device_id;

    VKID.Auth.exchangeCode(code, deviceId)
      .then(() => {
        window.location.href = "/lobby.html";
      })
      .catch((err) => {
        console.error("Auth exchange error:", err);
      });
  });
}