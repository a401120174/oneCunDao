// 獲取頁面元素
const wrapper = document.querySelector('.w-full.md\\:w-3\\/5')
const inputYear = document.querySelector('#year')
const inputMonth = document.querySelector('#month')
const inputDay = document.querySelector('#day')
const form = document.querySelector('#form')
const button = document.querySelector('#submit')
const todayYear = new Date().getFullYear()
const confirmModal = document.querySelector('#confirmModal')
const modalContent = document.querySelector('#modalContent')
const cancelButton = document.querySelector('#cancelButton')
const confirmButton = document.querySelector('#confirmButton')

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

// 建立 toast 通知容器
const toastContainer = document.createElement('div')
toastContainer.className = 'fixed top-4 right-4 z-50 flex flex-col items-end space-y-2'
document.body.appendChild(toastContainer)

// 顯示 toast 通知
function showToast(message, type = 'success') {
    const toast = document.createElement('div')
    const colorClass = type === 'success' ? 'bg-green-500' : 'bg-red-500'
    
    toast.className = `${colorClass} text-white px-4 py-2 rounded shadow-lg flex items-center transition-opacity duration-300 opacity-0`
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            ${type === 'success' 
                ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
                : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>'}
        </svg>
        <span>${message}</span>
    `
    
    toastContainer.appendChild(toast)
    
    // 觸發動畫
    setTimeout(() => {
        toast.classList.replace('opacity-0', 'opacity-100')
    }, 10)
    
    // 3秒後移除
    setTimeout(() => {
        toast.classList.replace('opacity-100', 'opacity-0')
        setTimeout(() => {
            toastContainer.removeChild(toast)
        }, 300)
    }, 3000)
}

// 顯示確認 Modal
function showConfirmModal() {
    const formData = new FormData(form)
    const data = {}
    for (var pair of formData.entries()) {
        data[pair[0]] = pair[1]
    }

    // 清空 modal 內容
    modalContent.innerHTML = ''

    // 添加關懷資訊
    const infoDiv = document.createElement('div')
    infoDiv.className = 'p-3 bg-gray-100 rounded-lg'
    infoDiv.innerHTML = `
        <p class="mb-1"><strong>小組/班別:</strong> ${data.group}</p>
        <p class="mb-1"><strong>關懷/回報人:</strong> ${data.teacher}</p>
        <p class="mb-1"><strong>成全關懷對象:</strong> ${data.student}</p>
        <p class="mb-1"><strong>成全關懷/活動日期:</strong> ${data.year}-${data.month}-${data.day}</p>
        <p class="mb-1"><strong>方式:</strong> ${data.way}</p>
        <p class="mb-1"><strong>成全關懷/活動簡述:</strong> ${data.description}</p>
        ${data.note ? `<p><strong>備註:</strong> ${data.note}</p>` : ''}
    `
    modalContent.appendChild(infoDiv)

    // 顯示 modal
    confirmModal.classList.remove('hidden')
}

// 隱藏確認 Modal
function hideConfirmModal() {
    confirmModal.classList.add('hidden')
}

// 表單驗證
function validateForm() {
    // 簡單的前端驗證
    const requiredFields = [
        form.querySelector('[name="group"]'),
        form.querySelector('[name="teacher"]'),
        form.querySelector('[name="student"]'),
        form.querySelector('[name="description"]')
    ]

    for (const field of requiredFields) {
        if (!field.value.trim()) {
            showToast(`請填寫必填欄位: ${field.placeholder || field.name}`, 'error')
            field.focus()
            return false
        }
    }

    return true
}

// 表單提交處理函數
function handleFormSubmit(e) {
    if (e) e.preventDefault()
    
    const formData = new FormData(form)
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
                if (typeof liff !== 'undefined' && liff.isInClient()) {
                    liff.closeWindow()
                }
            }, 1500)
        })

        return response.json()
    }).catch(function(error) {
        console.error('發送數據時出錯:', error)
        button.innerText = '發送失敗，請重試'
        button.disabled = false
        button.classList.remove('opacity-70', 'cursor-not-allowed')
        showToast('發送失敗，請重試', 'error')
    })
}

// 初始化應用程序
function initApp() {
    // 修改提交按鈕的行為，點擊時顯示確認 modal
    button.addEventListener('click', function(e) {
        e.preventDefault()
        if (validateForm()) {
            showConfirmModal()
        }
    })
    
    // 綁定確認 modal 的按鈕事件
    cancelButton.addEventListener('click', hideConfirmModal)
    
    confirmButton.addEventListener('click', function() {
        hideConfirmModal()
        // 調用表單提交函數
        handleFormSubmit()
    })
}

// 當 DOM 加載完成時執行初始化
document.addEventListener('DOMContentLoaded', initApp)