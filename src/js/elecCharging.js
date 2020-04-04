var header = document.querySelector('header')
var article = document.querySelector('article')

var requestURL =
  'https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=fJcPeIWodLiajDQBcczEfCR34aSkvLYZ23GjCsup&latitude=29.564563&longitude=-98.5331551&radius=3.5&status=E&access=public&fuel_type=ELEC'
var request = new XMLHttpRequest()
request.open('GET', requestURL)
request.responseType = 'json'
request.send()

request.onload = function () {
  var stations = request.response
  populateHeader(stations)
  showResults(stations)
}

function populateHeader(jsonObj) {
  var myH2 = document.createElement('h2')
  myH2.textContent =
    'Station Locator Url: ' + jsonObj['station_locator_url']
  header.appendChild(myH2)

  var myPara = document.createElement('p')
  myPara.textContent =
    'Station Locator Url: ' + jsonObj['station_locator_url']
  header.appendChild(myPara)
}

function showResults(jsonObj) {
  var stations = jsonObj['fuel_stations']

  for (var i = 0; i < stations.length; i++) {
    var myArticle = document.createElement('article')
    var myH2 = document.createElement('h2')
    var myPara1 = document.createElement('p')
    var myPara2 = document.createElement('p')

    myH2.textContent = 'Name: ' + stations[i].station_name
    myPara1.textContent = 'Phone: ' + stations[i].station_phone
    myPara2.textContent = 'Street Address: ' + stations[i].street_address

    myArticle.appendChild(myH2)
    myArticle.appendChild(myPara1)
    myArticle.appendChild(myPara2)

    article.appendChild(myArticle)
  }
}