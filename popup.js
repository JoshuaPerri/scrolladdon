
var whitelist = []

browser.storage.local.get().then(
  function(obj) {
    // Initialize storage if not done yet
    if (Object.keys(obj).length == 0) {
      obj = {
        "whitelist": [],
      }
      browser.storage.local.set(obj)
    }
    whitelist = obj.whitelist
    generateWhitelistTable()
  }
)

function saveWhitelist(i) {
  var name = document.querySelector(`#name-input-${i}`).value
  var number = document.querySelector(`#number-input-${i}`).value

  if (name === "" && number === "") {
    whitelist.splice(i, 1)
    generateWhitelistTable()
  } else if (name !== "" && number !== "") {
    number = parseInt(number)
    whitelist[i] = {name: name, scroll: number}
    browser.storage.local.set({"whitelist": whitelist})
  } else {
    console.log("Enter a name and a number")
  }
}

function addNewWhitelist() {
  var index = whitelist.length

  var name = document.querySelector(`#name-input-${index}`).value
  var number = document.querySelector(`#number-input-${index}`).value

  if (name === "" || number === "") {
    console.log("Enter a name and a number")
  } else {
    var btn = document.querySelector(`#save-button-${index}`)
    btn.removeEventListener("click", addNewWhitelist)
    btn.addEventListener("click", (e) => {
      saveWhitelist(index)
    })

    number = parseInt(number)
    whitelist.push({name: name, scroll: number})
    browser.storage.local.set({"whitelist": whitelist})

    index = whitelist.length
    str = `<input id="name-input-${index}" type="text" placeholder="Whitelisted site">
           <input id="number-input-${index}" type="number" placeholder="Scroll amount">
           <input id="save-button-${index}" type="button" value="Save">`
    whitelistTable.insertAdjacentHTML('beforeend', str)  
    document.querySelector(`#save-button-${index}`).addEventListener("click", addNewWhitelist)
  }
}

var whitelistTable = document.querySelector("#whitelist-table")
function generateWhitelistTable() {
  whitelistTable.innerHTML = ""
  whitelist.forEach((e, i) => {
    str = `<input id="name-input-${i}" type="text" value="${e.name}">
           <input id="number-input-${i}" type="number" value="${e.scroll}">
           <input id="save-button-${i}" type="button" value="Save">`
    whitelistTable.insertAdjacentHTML('beforeend', str)
    document.querySelector(`#save-button-${i}`).addEventListener("click", (e) => {
      saveWhitelist(i)
    })
  })

  var index = whitelist.length
  str = `<input id="name-input-${index}" type="text" placeholder="Whitelisted site">
         <input id="number-input-${index}" type="number" placeholder="Scroll amount">
         <input id="save-button-${index}" type="button" value="Save">`
  whitelistTable.insertAdjacentHTML('beforeend', str)    
  document.querySelector(`#save-button-${index}`).addEventListener("click", addNewWhitelist)
}
