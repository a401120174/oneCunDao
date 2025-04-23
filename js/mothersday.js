// Tailwind config for Shadcn UI styling
tailwind.config = {
    darkMode: ["class"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
};

// DOM elements
const wrapper = document.querySelector('.w-full.md\\:w-3\\/5');
const form = document.querySelector('#form');
const button = document.querySelector('#submit');
const studentsContainer = document.querySelector('#students-container');
const addStudentButton = document.querySelector('#add-student');

// Create toast container div
const toastContainer = document.createElement('div');
toastContainer.className = 'fixed top-4 right-4 z-50 flex flex-col items-end space-y-2';
document.body.appendChild(toastContainer);

// Track student count
let studentCount = 1;

// Function to show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const colorClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
    toast.className = `${colorClass} text-white px-4 py-2 rounded shadow-lg flex items-center transition-opacity duration-300 opacity-0`;
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            ${type === 'success' 
                ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
                : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>'}
        </svg>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.replace('opacity-0', 'opacity-100');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.replace('opacity-100', 'opacity-0');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add a new student input field
function addStudentField() {
    if (studentCount < 4) {
        studentCount++;
        
        const newParticipantForm = document.createElement('div');
        newParticipantForm.className = 'participant-form p-3 bg-white/10 rounded-lg';
        
        newParticipantForm.innerHTML = `
            <div class="participant-header flex justify-between items-center mb-2">
                <h3 class="text-white font-medium">參加者 ${studentCount}</h3>
                <button type="button" class="remove-participant p-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="text-sm font-medium text-white">姓名</label>
                    <input type="text" class="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" name="name${studentCount}" placeholder="請填入姓名" required>
                </div>
                <div class="space-y-1">
                    <label class="text-sm font-medium text-white">性別</label>
                    <div class="flex space-x-4">
                        <label class="inline-flex items-center">
                            <input type="radio" name="gender${studentCount}" value="男" class="form-radio h-4 w-4" required checked>
                            <span class="ml-2 text-white">男</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="radio" name="gender${studentCount}" value="女" class="form-radio h-4 w-4">
                            <span class="ml-2 text-white">女</span>
                        </label>
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="text-sm font-medium text-white">是否是母親</label>
                    <div class="flex space-x-4">
                        <label class="inline-flex items-center">
                            <input type="radio" name="isMother${studentCount}" value="是" class="form-radio h-4 w-4" required>
                            <span class="ml-2 text-white">是</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="radio" name="isMother${studentCount}" value="否" class="form-radio h-4 w-4" checked>
                            <span class="ml-2 text-white">否</span>
                        </label>
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="text-sm font-medium text-white">年齡區間</label>
                    <select class="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" name="ageRange${studentCount}" required>
                        <option value="12歲以下">12歲以下</option>
                        <option value="13~64歲" selected>13~64歲</option>
                        <option value="65~76歲">65~76歲</option>
                        <option value="76歲以上">76歲以上</option>
                    </select>
                </div>
                <div class="space-y-1">
                    <label class="text-sm font-medium text-white">是否已經求道</label>
                    <div class="flex space-x-4">
                        <label class="inline-flex items-center">
                            <input type="radio" name="isEnlightened${studentCount}" value="是" class="form-radio h-4 w-4" required>
                            <span class="ml-2 text-white">是</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="radio" name="isEnlightened${studentCount}" value="否" class="form-radio h-4 w-4" checked>
                            <span class="ml-2 text-white">否</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        studentsContainer.appendChild(newParticipantForm);
        
        // Add event listener to the remove button
        const removeButton = newParticipantForm.querySelector('.remove-participant');
        removeButton.addEventListener('click', () => {
            studentsContainer.removeChild(newParticipantForm);
            studentCount--;
            // Update participant numbers
            updateParticipantNumbers();
        });
    }
    
    // If max participants reached, disable add button
    if (studentCount >= 4) {
        addStudentButton.disabled = true;
        addStudentButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// Update participant numbers after removal
function updateParticipantNumbers() {
    const participantForms = studentsContainer.querySelectorAll('.participant-form');
    participantForms.forEach((form, index) => {
        const headerElement = form.querySelector('.participant-header h3');
        headerElement.textContent = `參加者 ${index + 1}`;
        
        // Update form field names
        const nameInput = form.querySelector('input[name^="name"]');
        const genderInputs = form.querySelectorAll('input[name^="gender"]');
        const isMotherInputs = form.querySelectorAll('input[name^="isMother"]');
        const ageRangeSelect = form.querySelector('select[name^="ageRange"]');
        const isEnlightenedInputs = form.querySelectorAll('input[name^="isEnlightened"]');
        
        if (nameInput) nameInput.name = `name${index + 1}`;
        genderInputs.forEach(input => input.name = `gender${index + 1}`);
        isMotherInputs.forEach(input => input.name = `isMother${index + 1}`);
        if (ageRangeSelect) ageRangeSelect.name = `ageRange${index + 1}`;
        isEnlightenedInputs.forEach(input => input.name = `isEnlightened${index + 1}`);
    });
    
    // Re-enable add button if below max
    if (studentCount < 4) {
        addStudentButton.disabled = false;
        addStudentButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(document.querySelector('#form'));
    const data = {};
    for (var pair of formData.entries()) {
        data[pair[0]] = pair[1];
    }

    button.disabled = true;
    button.innerText = '回報中';
    button.classList.add('opacity-70', 'cursor-not-allowed');

    // 收集所有參加者資料
    const allParticipantsData = [];
    for (let i = 1; i <= studentCount; i++) {
        const postData = {
            區域: data.group,
            提報人: data.reporter,
            參加人姓名: data[`name${i}`],
            性別: data[`gender${i}`],
            母親: data[`isMother${i}`],
            年齡區間: data[`ageRange${i}`],
            求道: data[`isEnlightened${i}`],
            備註: data.note || ''
        };
        allParticipantsData.push(postData);
    }

    // 按順序一個一個發送
    sendAllDataSequentially(allParticipantsData)
        .then(() => {
            console.log('所有參加者資料發送完成');
            // 建立結果顯示
            createResultDisplay(data);
        })
        .catch(error => {
            console.error('發送資料過程中出錯:', error);
            button.innerText = '發送失敗，請重試';
            setTimeout(() => {
                button.disabled = false;
                button.innerText = '送出';
                button.classList.remove('opacity-70', 'cursor-not-allowed');
            }, 2000);
        });
}

// 按順序發送所有參加者資料
function sendAllDataSequentially(allParticipantsData) {
    return new Promise(async (resolve, reject) => {
        try {
            for (let i = 0; i < allParticipantsData.length; i++) {
                const participantIndex = i + 1;
                const statusText = `正在發送第 ${participantIndex}/${allParticipantsData.length} 位參加者資料...`;
                button.innerText = statusText;
                console.log(statusText);
                
                // 等待當前參加者資料發送完成
                await sendDataToGoogleScript(allParticipantsData[i], participantIndex);
                showToast(`成功發送第 ${participantIndex} 位參加者資料`);
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

// 向 Google Apps Script 發送數據
function sendDataToGoogleScript(postData, index) {
    // Google Apps Script Web App URL - 更新為新的 URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbynQz5yticz6G7Q2ekhuCCGFwjr3yP8tqN9RfihCKDbOuLkRKzs9oHZYSApTibNMnoh/exec';
    
    // 將參數轉換為 URL 查詢字符串
    const params = new URLSearchParams();
    for (const key in postData) {
        params.append(key, postData[key]);
    }
    
    console.log(`發送參加者 ${index} 的資料:`, postData);

    // 構建完整的 GET 請求 URL
    const requestURL = `${scriptURL}?${params.toString()}`;
    
    // 返回 Promise 以支持順序發送
    return fetch(requestURL, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(`成功發送參加者 ${index} 的資料`);
        return response.text();
    })
    .catch(error => {
        console.error(`發送參加者 ${index} 的資料時出錯:`, error);
        throw error; // 重新拋出錯誤以便上游處理
    });
}

// 創建結果顯示
function createResultDisplay(data) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    
    // Create participant summary
    const participants = [];
    for (let i = 1; i <= studentCount; i++) {
        const name = data[`name${i}`];
        const gender = data[`gender${i}`];
        const isMother = data[`isMother${i}`];
        const ageRange = data[`ageRange${i}`];
        const isEnlightened = data[`isEnlightened${i}`];
        
        const participantInfo = `${name}（${gender}性、${ageRange}、${isMother === '是' ? '母親' : '非母親'}、${isEnlightened === '是' ? '已求道' : '未求道'}）`;
        participants.push(participantInfo);
    }
    
    resultDiv.innerHTML = `🥳『${data.group}』 ${data.reporter} 報名母親節活動，參加人員：${participants.join('、')}${data.note ? `，備註：${data.note}` : ''}`;
    
    const resultTitle = document.createElement('h3');
    resultTitle.className = 'text-lg font-medium text-center mb-4';
    resultTitle.innerHTML = `請點擊下方文字, 會將文字複製起來, 再自行貼上訊息至LINE群組裡回報`;
    
    wrapper.innerHTML = '';
    wrapper.appendChild(resultTitle);
    wrapper.appendChild(resultDiv);

    resultDiv.setAttribute('data-clipboard-text', resultDiv.innerText);

    new ClipboardJS('.result');

    resultDiv.addEventListener('click', () => {
        alert('已複製到剪貼簿');

        setTimeout(() => {
            if (typeof liff !== 'undefined' && liff.isInClient()) {
                liff.closeWindow();
            }
        }, 1500);
    });
}

// Initialize application
function initApp() {
    // 移除不需要的日期選擇器初始化
    // addStudentButton 可能沒有正確的事件監聽器
    if (addStudentButton) {
        addStudentButton.addEventListener('click', addStudentField);
    } else {
        console.error('找不到新增參加者按鈕');
    }
    
    form.addEventListener('submit', handleFormSubmit);
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);