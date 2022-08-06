// 訓員人數 專車地點 專車價錢 儲存按鈕
const staffNumber_input = document.querySelector('[name="number_of_staff"]');
const place_input = document.querySelector('[name="place"]');
const price_input = document.querySelector('[name="price"]');
const add_station_btn = document.getElementById("add_station");

// 設置 訓員人數 (LocalStorage)
staffNumber_input.value = StaffNumber

// 設置 車站列表 (LocalStorage)
function setStationList() {
    for(let i = 0; i < StationList.length; i++){
        const item = document.createElement('li');
        item.innerHTML = `
        <span class="del">X</span><span>${StationList[i].place}</span><span>${StationList[i].price}</span>
        `
        document.querySelector('.stationList').appendChild(item);
    }
}

// 新增 車站節點
function postStation(station) {
    const item = document.createElement('li');
    item.innerHTML = `
    <span class="del">X</span><span>${station.place}</span><span>${station.price}</span>
    `
    document.querySelector('.stationList').appendChild(item);
}

// 更新 車站列表 (LocalStorage)
function updateStationList(newArr) {
    window.localStorage.setItem('stationList', JSON.stringify(newArr));
}

// 檢查 該站是否存在 (LocalStorage)
function checkStationExist(place) {
    for(let i = 0; i < StationList.length; i++){
        if (StationList[i].place == place){
            return true
        }
    }
    return false
}



// 新增車站
add_station_btn.addEventListener('click',function(){
    if (place_input.value === '' || price_input.value === '') {
        alert("請輸入專車 站別和價錢 !")
        return
    }
    if (place_input.value.length > 7) {
        alert("站別名稱 請勿超過 7 個字 !")
        return
    }
    if (checkStationExist(place_input.value)) {
        alert("此站別 已存在 !")
        return
    }

    let station = new Station(place_input.value, price_input.value, [])
    StationList.push(station)
    postStation(station)
    updateStationList(StationList)
    place_input.value = ''
    price_input.value = ''
})

// 移除車站
document.querySelector(".stationList").addEventListener('click',function(e){

    if(!e.target.classList.contains("del")) return;
    let item = e.target.parentElement
    item.remove();
    let itemConent = item.children[1].textContent;
    let index = StationList.findIndex(s => s.place == itemConent);
    StationList.splice(index,1)
    updateStationList(StationList);
});

// 更新訓員人數
staffNumber_input.addEventListener('change',function(e){
    let num = (e.target.value > 0) ? parseInt(e.target.value) : 0;
    window.localStorage.setItem('staffNumber', JSON.stringify(num))
})

setStationList()