let obj = {};
function toggleDarkLight() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}
let area = document.getElementById("area");
let loca = document.getElementById("loca");
let weat = document.getElementById("weat");
let temp = document.getElementById("temp");
let rain = document.getElementById("rain");
let feel = document.getElementById("feel");
// let pict = document.getElementById("pict");

area.addEventListener('change', showWeather, false); //建立監聽

fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-C2CDA243-23D4-426B-BD85-84F8ACF41A84")
  .then(response => response.json())
  .then(data => {
    obj = data;
    console.log(data)

    let arr = obj.records.location
    let locat = []
    console.log(arr)
    console.log(arr.length)
    console.log(arr.length)

    for (i = 0; i < arr.length; i++) {
      locat[i] = obj.records.location[i].locationName //地區
    }

    for (let i = 0; i < arr.length; i++) { //回傳地區到下拉式選單
      let option = document.createElement('option');
      console.log(locat[i])
      option.innerText = locat[i];
      area.appendChild(option);
    }
    showWeather();
  })

function showWeather(e) {
  let arr = obj.records.location
  let locat = []
  let wx = []
  let pi = []
  let pop = []
  let mint = []
  let ci = []
  let maxt = []

  for (i = 0; i < arr.length; i++) {
    locat[i] = obj.records.location[i].locationName //地區
    wx[i] = obj.records.location[i].weatherElement[0].time[2].parameter.parameterName //天氣
    // pi[i] = obj.records.location[i].weatherElement[0].time[2].parameter.parameterValue //天氣代碼 這部分沒做
    ci[i] = obj.records.location[i].weatherElement[3].time[2].parameter.parameterName //天氣型態
    mint[i] = obj.records.location[i].weatherElement[2].time[2].parameter.parameterName //最低溫
    maxt[i] = obj.records.location[i].weatherElement[4].time[2].parameter.parameterName //最高溫
    pop[i] = obj.records.location[i].weatherElement[1].time[2].parameter.parameterName //降雨機率
  }
  console.log(locat)
  console.log(wx)
  console.log(pi)
  console.log(ci)
  console.log(mint)
  console.log(maxt)
  console.log(pop)

  let select;
  if (!e) {
    select = '嘉義縣';
  } else {
    select = e.target.value;
  }
  for (let i = 0; i < arr.length; i++) {
    if (select == locat[i]) {
      loca.innerText = locat[i];
      weat.innerText = wx[i];
      temp.innerText = mint[i] + "~" + maxt[i] + "°C";
      rain.innerText = "降雨機率：" + pop[i] + "%";
      feel.innerText = "感覺起來：" + ci[i];
    }
  }
}