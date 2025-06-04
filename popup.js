
var lists = {}

browser.storage.local.get().then(
  function(obj) {
    // Initialize storage if not done yet
    if (Object.keys(obj).length == 0) {
      obj = {
        "whitelist": [],
        "blacklist": [],
      }
      browser.storage.local.set(obj)
    }
    lists = obj
    generateWhitelistTable()
    generateBlacklistTable()
  }
)



function saveWhitelist(i) {
  var name = document.querySelector(`#w-name-input-${i}`).value
  var number = document.querySelector(`#w-number-input-${i}`).value

  lists.whitelist[i] = {name: name, scroll: number}
  browser.storage.local.set(lists)
}

function saveBlacklist(i) {
  var name = document.querySelector(`#b-name-input-${i}`).value

  lists.blacklist[i] = {name: name}
  browser.storage.local.set(lists)
}

function addNewWhitelist() {
  var index = lists.whitelist.length

  var name = document.querySelector(`#w-name-input-${index}`).value
  var number = document.querySelector(`#w-number-input-${index}`).value

  if (name === "" || number === "") {
    console.log("Error")
  } else {
    number = parseInt(number)
    lists.whitelist.push({name: name, scroll: number})
    browser.storage.local.set(lists)

    str = `<input id="w-name-input-${index}" type="text" placeholder="Whitelisted site">
           <input id="w-number-input-${index}" type="number" placeholder="Scroll amount">
           <input id="w-save-button-${i}" type="button" value="Save">`
    whitelistTable.insertAdjacentHTML('beforeend', str)  
    document.querySelector(`#w-save-button-${index}`).addEventListener("click", (e) => {
      addNewWhitelist()
    })
  }
}

console.log(true ? "a" : "b")

function addNewBlacklist() {
  var index = lists.blacklist.length

  var name = document.querySelector(`#b-name-input-${index}`).value

  if (name === "") {
    console.log("Error")
  } else {
    lists.blacklist.push({name: name})
    browser.storage.local.set(lists)

    str = `<input id="b-name-input-${index}" type="text" placeholder="Blacklist site">
           <input id="b-save-button-${index}" type="button" value="Save">`
    blacklistTable.insertAdjacentHTML('beforeend', str) 
    document.querySelector(`#b-save-button-${index}`).addEventListener("click", (e) => {
      addNewBlacklist()
    })
  }
}

var whitelistTable = document.querySelector("#whitelist-table")
function generateWhitelistTable() {
  whitelistTable.innerHTML = ""
  lists.whitelist.forEach((e, i) => {
    str = `<input id="w-name-input-${i}" type="text" value="${e.name}">
           <input id="w-number-input-${i}" type="number" value="${e.scroll}">
           <input id="w-save-button-${i}" type="button" value="Save">`
    whitelistTable.insertAdjacentHTML('beforeend', str)
    document.querySelector(`#w-save-button-${i}`).addEventListener("click", (e) => {
      saveWhitelist(i)
    })
  });

  var index = lists.whitelist.length
  str = `<input id="w-name-input-${index}" type="text" placeholder="Whitelisted site">
         <input id="w-number-input-${index}" type="number" placeholder="Scroll amount">
         <input id="w-save-button-${index}" type="button" value="Save">`
  whitelistTable.insertAdjacentHTML('beforeend', str)    
  document.querySelector(`#w-save-button-${index}`).addEventListener("click", (e) => {
    addNewWhitelist()
  })
}

var blacklistTable = document.querySelector("#blacklist-table")
function generateBlacklistTable() {
  blacklistTable.innerHTML = ""
  lists.blacklist.forEach((e, i) => {
    str = `<input id="b-name-input-${i}" type="text" value="${e.name}">
           <input id="b-save-button-${i}" data-index="${i}" type="button" value="Save">`
    blacklistTable.insertAdjacentHTML('beforeend', str)    
    document.querySelector(`#b-save-button-${i}`).addEventListener("click", (e) => {
      saveBlacklist(i)
    })
  });

  var index = lists.blacklist.length
  str = `<input id="b-name-input-${index}" type="text" placeholder="Blacklisted site">
         <input id="b-save-button-${index}" type="button" value="Save">`
  blacklistTable.insertAdjacentHTML('beforeend', str)    
  document.querySelector(`#b-save-button-${index}`).addEventListener("click", (e) => {
    addNewBlacklist()
  })
}

var swapButton = document.querySelector("#swap-button")
function swapTables() {
  whitelistTable.classList.toggle("hidden")
  blacklistTable.classList.toggle("hidden")

  var text = swapButton.innerHTML
  if (text === "Swap to blacklist") {
    swapButton.innerHTML = "Swap to whitelist"
  } else {
    swapButton.innerHTML = "Swap to blacklist"
  }
}

document.querySelector("#swap-button").addEventListener("click", (e) => {
  swapTables()
})