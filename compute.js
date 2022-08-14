// 訓員選單 車站選單
const StaffList = document.getElementById("staff_selector");
const PlaceList = document.getElementById("place_selector");

// 設置 選單
for(let i = 1; i < StaffNumber + 1; i++) {
    let pid = String(i).padStart(3, '0');
    let option = new Option(pid, pid); 
    StaffList.appendChild(option)
}

for(let i = 0; i < StationList.length; i++) {
    let option = new Option(StationList[i].place, StationList[i].price)
    PlaceList.appendChild(option)
}

// 更新 該站乘客清單
function updateStationList(staffArr) {

    // 已登記者 移出原站別
    for(let i = 0; i < staffArr.length; i++){
        let index = StationList.findIndex(s => s.passenger.includes(staffArr[i]));
        if (index > -1){
            let staffIndex = StationList[index].passenger.indexOf(staffArr[i])
            StationList[index].passenger.splice(staffIndex,1)
        }
    }
    
    // 登記 乘客清單至此站
    let place = PlaceList.options[PlaceList.selectedIndex].text
    for(let i = 0; i < StaffList.length; i++){
        if(StationList[i].place == place) {
            StationList[i].passenger = staffArr
            updateStaffList_placeInfo(staffArr, place)
            return
        }
    }
}

// 更新 訓員選單 (顯示登記站別)
function updateStaffList_placeInfo(staffArr, place){         
    for(let i = 0; i < StaffList.length; i++){

        if(staffArr.includes(StaffList.options[i].value)){
            StaffList.options[i].text = StaffList.options[i].value + ' - ' + place
        }
        else if(StaffList.options[i].text.includes(place)){
            StaffList.options[i].text = StaffList.options[i].value
        }
    }        
}

// 登記 訓員站別
function addStaff(e) {
    let staff = []
    for(let i = 0; i < e.options.length; i++){
        if(e.options[i].selected) {
            staff.push(e.options[i].value)
        }
    }
    updateStationList(staff)
    printResult()
}

// 輸出 統計結果
function printResult() {

    let result = document.getElementById('result');
    result.textContent = ''

    let text = ''
    let text2 = ''
    let amount = [0, 0]

    for(let i = 0; i < StationList.length; i++){
        
        let place = StationList[i].place
        let price = StationList[i].price
        let passenger = StationList[i].passenger
        
        for(let j = 0; j < passenger.length; j++){
            if(j == 0){
                text += place + '($' + price + ') : ';
            }
            if(j < passenger.length - 1){
                text += passenger[j] + ', ';
            }
            else{
                text += passenger[j] + '\n\n'
            }    
        }
        
        if(passenger.length > 0){
            text2 += place + ' 共 ' + passenger.length + '員 搭乘 ($' + price*passenger.length + ')\n'
            amount[0] += passenger.length
            amount[1] += passenger.length*price
        }
    }

    result.textContent += text + '==================' + '\n' + text2 + '\n';
    result.textContent += '專車人數 共 ' + amount[0] + ' 員' + '\n'
    result.textContent += '專車費用 共 ' + amount[1] + ' 元'

    result.style.height = 'auto';
    result.style.height = result.scrollHeight + 'px';
}

// 複製 統計結果
function copyResult(e){
    document.getElementById('result').select();
    document.execCommand('copy');
    alert("已複製 統計結果")
}

// 取得該站別 乘客(訓員)
function getStaffByPlace() {
    let place = PlaceList.options[PlaceList.selectedIndex].text
    let staff = {this:[], other:[]}
    for(let i = 0; i < StationList.length; i++){
        if(StationList[i].place != place) {
            staff['other'].push(...StationList[i].passenger)
        }
        else{
            staff['this'].push(...StationList[i].passenger)
        }
    }
    return staff
}

// 根據站別 選取登記的乘客(訓員)選單 & 將非本站的乘客設成非選
PlaceList.addEventListener('change', function(){
    for(let i = 0; i < StaffList.length; i++){
        StaffList[i].selected = false
        StaffList[i].disabled = false
    }

    let staff = getStaffByPlace()
    for(let i = 0; i < StaffList.length; i++){
        if(staff['this'].includes(StaffList[i].value)){
            StaffList[i].selected = true
        }
        else if (staff['other'].includes(StaffList[i].value)){
            StaffList[i].disabled = true
        }
    }
})
