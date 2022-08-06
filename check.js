// 核對區塊 輸入區塊
const checkBlock = document.querySelector(".check-list")
const inputBlock = document.querySelector(".statistics-input")

// 將統計結果 轉換成 勾選清單
function stationInfoSpilt(data) {
    checkBlock.textContent = ''
    let list = data.split('==================')[0].split('\n')
    for(let i = 0; i < list.length; i++){
        if(list[i] == '') continue;
        let info = list[i].split(':');
        let station = info[0].match('[^(]*')[0];
        let staff = info[1].split(',');
        checkBlock.innerHTML += `<span>${station}<span> <br>`
        
        staff.forEach(function(value, index) {
            checkBlock.innerHTML += `<div><input type='checkbox'><span>${value}<span><div>`
            if (index == staff.length -1){
                checkBlock.innerHTML +=`<br><br>`
            }
        });

    }
}

inputBlock.addEventListener('input', function() {
    let data = inputBlock.value
    stationInfoSpilt(data)

    inputBlock.style.height = 'auto';
    inputBlock.style.height = inputBlock.scrollHeight + 'px';
})