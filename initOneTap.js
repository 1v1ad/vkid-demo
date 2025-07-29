if ('VKIDSDK' in window) {
  const VKID = window.VKIDSDK;

  VKID.Config.init({
    app: 53969710,
    redirectUrl: 'https://vkid-demo.vercel.app/api/vk/callback',
    responseMode: VKID.ConfigResponseMode.Code,
  });

  const oneTap = new VKID.OneTap();

  oneTap.render({
    container: document.getElementById('vkid-container'),
    showAlternativeLogin: true,
  })
  .on(VKID.WidgetEvents.ERROR, (err) => {
    console.error('VKID Error:', err);
  })
  .on(VKID.OneTapEvents.CODE_RECEIVED, ({ code }) => {
    window.location.href = `/api/vk/callback?code=${encodeURIComponent(code)}`;
  });
}
