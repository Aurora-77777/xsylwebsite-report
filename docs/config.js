// 认证配置 - 此文件不应提交到 Git 仓库
const PASSWORD = 'xsyl2025'; // 请修改为您想要的密码
const AUTH_KEY = 'report_authenticated';
const AUTH_TIMESTAMP = 'report_auth_timestamp';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24小时（毫秒）

// 检查是否已认证
function checkAuth() {
    const authenticated = sessionStorage.getItem(AUTH_KEY) === 'true';
    const timestamp = sessionStorage.getItem(AUTH_TIMESTAMP);
    
    if (authenticated && timestamp) {
        const now = Date.now();
        const authTime = parseInt(timestamp);
        
        // 检查是否过期（24小时）
        if (now - authTime < SESSION_DURATION) {
            return true;
        } else {
            // 过期，清除认证
            sessionStorage.removeItem(AUTH_KEY);
            sessionStorage.removeItem(AUTH_TIMESTAMP);
        }
    }
    return false;
}

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('errorMsg');
    
    if (!input || !errorMsg) {
        console.error('找不到输入框或错误信息元素');
        return;
    }
    
    if (input.value === PASSWORD) {
        // 认证成功
        sessionStorage.setItem(AUTH_KEY, 'true');
        sessionStorage.setItem(AUTH_TIMESTAMP, Date.now().toString());
        
        // 清除错误信息
        errorMsg.textContent = '';
        input.classList.remove('error');
        
        // 直接跳转到tab1.html
        window.location.href = 'tab1.html';
    } else {
        // 密码错误
        errorMsg.textContent = '密码错误，请重试';
        input.value = '';
        input.focus();
        input.classList.add('error');
        setTimeout(() => {
            input.classList.remove('error');
        }, 500);
    }
}

// 注意：初始化逻辑在 index.html 中处理，此文件仅包含函数定义

