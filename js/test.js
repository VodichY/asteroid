var str = 'start_date=2020-01-01&end_date=2020-01-01&api_key=DEMO_KEY';
function getJsonFromUrl(url) {
  var result = {};
  url.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = item[1];
  });
  return result;
}

getJsonFromUrl(str);