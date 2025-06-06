
var url = window.location.href

browser.storage.local.get().then(
  function(obj) {
    obj.whitelist.forEach(el => {
      var pattern = new RegExp(el.name)
      if (pattern.test(url)) {
        window.scroll(0, el.scroll)
        return
      }
    });
  }
)