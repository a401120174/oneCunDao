// 獲取頁面元素
const wrapper = document.querySelector('.w-full.md\\:w-3\\/5')
const inputYear = document.querySelector('#year')
const inputMonth = document.querySelector('#month')
const inputDay = document.querySelector('#day')
const form = document.querySelector('#form')
const button = document.querySelector('#submit')
const todayYear = new Date().getFullYear()

// 設定年份選項
for (let i = todayYear; i >= 2000; i--) {
    const option = document.createElement('option')
    option.innerHTML = i
    option.value = i
    inputYear.appendChild(option)
}

inputYear.value = new Date().getFullYear()

// 設定月份選項
for (let i = 1; i <= 12; i++) {
    const option = document.createElement('option')
    option.innerHTML = i
    option.value = i

    inputMonth.appendChild(option)
}

inputMonth.value = new Date().getMonth() + 1

// 設定日期選項
for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option')
    option.innerHTML = i
    option.value = i

    inputDay.appendChild(option)
}

inputDay.value = new Date().getDate()

// 表單提交事件處理
form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(document.querySelector('#form'))
    const data = {}
    for (var pair of formData.entries()) {
        data[pair[0]] = pair[1]
    }

    // 建立基本 URL
    let url = 'https://script.google.com/macros/s/AKfycby-8CCNryaduyhBoxo889JrMDAN37kl6dsDRDWwvEA17wA3_TohHuCmFBgp4JZ2Bcxv2w/exec'

    // 將數據轉換為查詢字符串
    const queryString = new URLSearchParams()
    for (const key in data) {
        queryString.append(key, data[key])
    }

    // 將查詢字符串附加到 URL
    url += '?' + queryString.toString()

    button.disabled = true
    button.innerText = '回報中'
    button.classList.add('opacity-70', 'cursor-not-allowed')

    fetch(url, {
        method: 'GET'
    }).then(function (response) {
        const resultDiv = document.createElement('div')
        resultDiv.className = 'result'
        resultDiv.innerHTML = `🥳『${data.group}』 ${data.teacher}於 ${data.year}-${data.month}-${data.day} 透過『${data.way}』的方式關懷了${data.student}, ${data.description}${data.note ? `, ${data.note}` : ''}`
        
        const resultTitle = document.createElement('h3')
        resultTitle.className = 'text-lg font-medium text-center mb-4'
        resultTitle.innerHTML = `請點擊下方文字, 會將文字複製起來, 再自行貼上訊息至LINE群組裡回報`
        
        wrapper.innerHTML = ''
        wrapper.appendChild(resultTitle)
        wrapper.appendChild(resultDiv)

        resultDiv.setAttribute('data-clipboard-text', resultDiv.innerText)

        new ClipboardJS('.result')

        resultDiv.addEventListener('click', () => {
            alert('已複製到剪貼簿')

            setTimeout(() => {
                liff.closeWindow()
            }, 1500)
        })

        return response.json()
    })
})