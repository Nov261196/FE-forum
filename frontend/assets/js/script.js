document.addEventListener('DOMContentLoaded', () => {
    // --- KHỐI XỬ LÝ CHUYỂN ĐỔI FORM (GIỮ NGUYÊN) ---
    const loginForm = document.getElementById('login-form');
    
    const registerForm = document.getElementById('register-form');
    const forgotForm = document.getElementById('forgot-form');

    const registerLink = document.getElementById('register-link');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const loginLinkFromRegister = document.getElementById('login-link-from-register');
    const loginLinkFromForgot = document.getElementById('login-link-from-forgot');

    function showForm(formToShow) {
        loginForm.classList.remove('active-form');
        registerForm.classList.remove('active-form');
        forgotForm.classList.remove('active-form');
        formToShow.classList.add('active-form');
    }

    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(registerForm);
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(forgotForm);
        });
    }

    if (loginLinkFromRegister) {
        loginLinkFromRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(loginForm);
        });
    }

    if (loginLinkFromForgot) {
        loginLinkFromForgot.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(loginForm);
        });
    }

    // --- KHỐI XỬ LÝ SUBMIT FORM (GIỮ NGUYÊN) ---
    // Ví dụ về logic đăng nhập (bạn cần điền đầy đủ)
    const loginButton = document.getElementById('login-button');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginMessage = document.getElementById('login-message');

    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            loginMessage.textContent = ''; // Xóa thông báo cũ

            try {
                const response = await fetch('http://be-forum-production.up.railway.app/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    loginMessage.textContent = data.message;
                    loginMessage.style.color = 'green';
                    localStorage.setItem('token', data.token);
                    // Chuyển hướng người dùng hoặc cập nhật UI
                    window.location.href = '/dashboard.html';
                } else {
                    loginMessage.textContent = data.message || 'Đăng nhập thất bại.';
                    loginMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Lỗi đăng nhập:', error);
                loginMessage.textContent = 'Đã xảy ra lỗi mạng hoặc máy chủ không phản hồi.';
                loginMessage.style.color = 'red';
            }
        });
    }

    // Ví dụ về logic đăng ký (bạn cần điền đầy đủ)
    const registerButton = document.getElementById('register-button');
    const regFirstNameInput = document.getElementById('reg-first-name');
    const regLastNameInput = document.getElementById('reg-last-name');
    const regEmailInput = document.getElementById('reg-email');
    const regPasswordInput = document.getElementById('reg-password');
    const regConfirmPasswordInput = document.getElementById('reg-confirm-password');
    const regPhoneNumberInput = document.getElementById('reg-phone-number');
    const registerMessage = document.getElementById('register-message');

    if (registerButton) {
        registerButton.addEventListener('click', async () => {
            const username = `${regFirstNameInput.value} ${regLastNameInput.value}`.trim();
            const email = regEmailInput.value;
            const password = regPasswordInput.value;
            const confirmPassword = regConfirmPasswordInput.value;

            registerMessage.textContent = '';

            if (password !== confirmPassword) {
                registerMessage.textContent = 'Mật khẩu và xác nhận mật khẩu không khớp.';
                registerMessage.style.color = 'red';
                return;
            }
            if (password.length < 6) {
                registerMessage.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
                registerMessage.style.color = 'red';
                return;
            }

            try {
                const response = await fetch('http://be-forum-production.up.railway.app/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    registerMessage.textContent = data.message;
                    registerMessage.style.color = 'green';
                    setTimeout(() => {
                        showForm(loginForm);
                        regFirstNameInput.value = '';
                        regLastNameInput.value = '';
                        regEmailInput.value = '';
                        regPasswordInput.value = '';
                        regConfirmPasswordInput.value = '';
                        regPhoneNumberInput.value = '';
                    }, 2000);
                } else {
                    registerMessage.textContent = data.message || 'Đăng ký thất bại.';
                    registerMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Lỗi đăng ký:', error);
                registerMessage.textContent = 'Đã xảy ra lỗi mạng hoặc máy chủ không phản hồi.';
                registerMessage.style.color = 'red';
            }
        });
    }

    // Ví dụ về logic quên mật khẩu (bạn cần điền đầy đủ)
    const resetPasswordButton = document.getElementById('reset-password-button');
    const forgotEmailInput = document.getElementById('forgot-email');
    const forgotMessage = document.getElementById('forgot-message');

    if (resetPasswordButton) {
        resetPasswordButton.addEventListener('click', async () => {
            const email = forgotEmailInput.value;

            forgotMessage.textContent = '';

            try {
                const response = await fetch('http://be-forum-production.up.railway.app/api/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    forgotMessage.textContent = data.message;
                    forgotMessage.style.color = 'green';
                    forgotEmailInput.value = '';
                } else {
                    forgotMessage.textContent = data.message || 'Có lỗi xảy ra khi yêu cầu đặt lại mật khẩu.';
                    forgotMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Lỗi yêu cầu quên mật khẩu:', error);
                forgotMessage.textContent = 'Đã xảy ra lỗi mạng hoặc máy chủ không phản hồi.';
                forgotMessage.style.color = 'red';
            }
        });
    }
});




    
    // --- KHỐI XỬ LÝ CHUYỂN ĐỔI NGÔN NGỮ ---
    const languageSwitcher = document.querySelector('.language-switcher');
    const currentLangDisplay = document.querySelector('.current-lang-display');
    const langOptions = document.querySelector('.lang-options');

    // Dữ liệu bản dịch và thông tin cờ
    // Bạn có thể dễ dàng mở rộng bằng cách thêm các entry mới vào đây
    const translations = {
        vi: {
            langName: "Tiếng Việt",
            flagFile: "vietnam-flag-icon.svg", // Tên file cờ tương ứng
            // --- Bản dịch cho các phần tử ---
            login_welcomeBack: "Chào mừng trở lại",
            login_emailLabel: "Email",
            login_passwordLabel: "Mật khẩu",
            login_rememberMe: "Ghi nhớ tôi",
            login_forgotPassword: "Quên mật khẩu?",
            login_button: "Đăng nhập",
            login_noAccount: "Chưa có tài khoản?",
            login_registerLink: "Đăng ký",
            ph_loginEmail: "Nhập Email của bạn",
            ph_loginPassword: "Nhập mật khẩu của bạn",

            register_createAccount: "Tạo tài khoản của bạn",
            register_firstName: "Tên",
            register_lastName: "Họ",
            register_emailLabel: "Email",
            register_passwordLabel: "Mật khẩu",
            register_confirmPassword: "Xác nhận mật khẩu",
            register_phoneNumber: "Số điện thoại",
            register_agreeTerms: "Bằng việc tạo tài khoản, bạn đồng ý với",
            register_termsPrivacy: "Điều khoản & Quyền riêng tư",
            register_ofUs: "của chúng tôi.",
            register_button: "Đăng ký",
            register_haveAccount: "Đã có tài khoản?",
            register_loginLink: "Đăng nhập",
            ph_regFirstName: "Nhập Tên của bạn",
            ph_regLastName: "Nhập Họ của bạn",
            ph_regEmail: "Nhập Email của bạn",
            ph_regPassword: "Nhập mật khẩu",
            ph_regConfirmPassword: "Xác nhận mật khẩu",
            ph_regPhoneNumber: "Nhập Số điện thoại của bạn",

            forgot_forgotAccount: "Quên tài khoản",
            forgot_rememberPassword: "Nhớ mật khẩu của bạn?",
            forgot_loginHere: "Đăng nhập tại đây",
            forgot_emailAddress: "Địa chỉ Email",
            forgot_resetPassword: "Đặt lại mật khẩu",
            ph_forgotEmail: "Nhập Email của bạn"
        },
        en: {
            langName: "English",
            flagFile: "united-kingdom-flag-icon.svg", // Tên file cờ tương ứng
            // --- Bản dịch cho các phần tử ---
            login_welcomeBack: "Welcome back",
            login_emailLabel: "Email",
            login_passwordLabel: "Password",
            login_rememberMe: "Remember me",
            login_forgotPassword: "Forgot password?",
            login_button: "Login",
            login_noAccount: "Don't have an account?",
            login_registerLink: "Register",
            ph_loginEmail: "Enter your Email",
            ph_loginPassword: "Enter your password",

            register_createAccount: "Create your account",
            register_firstName: "First Name",
            register_lastName: "Last Name",
            register_emailLabel: "Email",
            register_passwordLabel: "Password",
            register_confirmPassword: "Confirm Password",
            register_phoneNumber: "Phone Number",
            register_agreeTerms: "By creating an account, you agree to our",
            register_termsPrivacy: "Terms & Privacy",
            register_ofUs: ".",
            register_button: "Register",
            register_haveAccount: "Already have an account?",
            register_loginLink: "Login",
            ph_regFirstName: "Enter your First Name",
            ph_regLastName: "Enter your Last Name",
            ph_regEmail: "Enter your Email",
            ph_regPassword: "Enter password",
            ph_regConfirmPassword: "Confirm password",
            ph_regPhoneNumber: "Enter your Phone Number",

            forgot_forgotAccount: "Forgot account",
            forgot_rememberPassword: "Remember your password?",
            forgot_loginHere: "Login here",
            forgot_emailAddress: "Email Address",
            forgot_resetPassword: "Reset Password",
            ph_forgotEmail: "Enter your Email"
        },
        ja: {
            langName: "日本語",
            flagFile: "japan-flag-icon.svg", // Tên file cờ tương ứng
            // --- Bản dịch cho các phần tử ---
            login_welcomeBack: "おかえりなさい",
            login_emailLabel: "メールアドレス",
            login_passwordLabel: "パスワード",
            login_rememberMe: "記憶する",
            login_forgotPassword: "パスワードをお忘れですか？",
            login_button: "ログイン",
            login_noAccount: "アカウントをお持ちではありませんか？",
            login_registerLink: "登録",
            ph_loginEmail: "メールアドレスを入力してください",
            ph_loginPassword: "パスワードを入力してください",

            register_createAccount: "アカウントを作成",
            register_firstName: "名",
            register_lastName: "姓",
            register_emailLabel: "メールアドレス",
            register_passwordLabel: "パスワード",
            register_confirmPassword: "パスワードを確認",
            register_phoneNumber: "電話番号",
            register_agreeTerms: "アカウントを作成することにより、お客様は当社の",
            register_termsPrivacy: "利用規約とプライバシー",
            register_ofUs: "に同意するものとします。",
            register_button: "登録",
            register_haveAccount: "すでにアカウントをお持ちですか？",
            register_loginLink: "ログイン",
            ph_regFirstName: "名を入力してください",
            ph_regLastName: "姓を入力してください",
            ph_regEmail: "メールアドレスを入力してください",
            ph_regPassword: "パスワードを入力してください",
            ph_regConfirmPassword: "パスワードを確認してください",
            ph_regPhoneNumber: "電話番号を入力してください",

            forgot_forgotAccount: "アカウントをお忘れですか",
            forgot_rememberPassword: "パスワードを覚えていますか？",
            forgot_loginHere: "こちらからログイン",
            forgot_emailAddress: "メールアドレス",
            forgot_resetPassword: "パスワードをリセット",
            ph_forgotEmail: "メールアドレスを入力してください"
        },
        // --- CÁCH THÊM NGÔN NGỮ MỚI: THÊM MỘT ENTRY VÀO ĐÂY ---
        // Ví dụ cho tiếng Hàn:
        // ko: {
        //     langName: "한국어",
        //     flagFile: "south-korea-flag-icon.svg", // Đảm bảo có file này trong assets/images
        //     login_welcomeBack: "환영합니다",
        //     // ... các bản dịch khác ...
        // }
    };

    /**
     * Dịch nội dung trang và cập nhật hiển thị cờ.
     * @param {string} lang Mã ngôn ngữ (ví dụ: 'vi', 'en', 'ja').
     */
    function setLanguage(lang) {
        // 1. Áp dụng bản dịch cho các phần tử trên trang
        const elements = document.querySelectorAll('.translatable');
        elements.forEach(el => {
            const key = el.dataset.key;
            if (translations[lang] && translations[lang][key] !== undefined) {
                if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // 2. Cập nhật cờ và thông tin của ngôn ngữ hiện tại
        const currentLangData = translations[lang];
        if (currentLangData) {
            const currentFlagImg = currentLangDisplay.querySelector('.flag-icon');
            currentFlagImg.src = `./assets/images/${currentLangData.flagFile}`;
            currentLangDisplay.dataset.lang = lang;
            currentLangDisplay.title = currentLangData.langName;
        }

        // 3. Cập nhật danh sách cờ trong dropdown (langOptions)
        langOptions.innerHTML = ''; // Xóa tất cả các cờ cũ trong dropdown

        // Lấy tất cả các mã ngôn ngữ có sẵn từ đối tượng translations
        const availableLangs = Object.keys(translations);

        availableLangs.forEach(otherLang => {
            // Chỉ thêm cờ vào dropdown nếu nó KHÔNG phải là ngôn ngữ hiện tại
            if (otherLang !== lang) {
                const otherLangData = translations[otherLang];
                if (otherLangData) {
                    const langButton = document.createElement('button');
                    langButton.classList.add('lang-btn');
                    langButton.dataset.lang = otherLang;
                    langButton.title = otherLangData.langName; // Tooltip cho cờ trong dropdown

                    const flagIcon = document.createElement('img');
                    flagIcon.classList.add('flag-icon');
                    flagIcon.src = `./assets/images/${otherLangData.flagFile}`;
                    flagIcon.alt = otherLangData.langName + ' Flag';

                    langButton.appendChild(flagIcon);

                    // Gắn sự kiện click cho nút cờ trong dropdown
                    langButton.addEventListener('click', (e) => {
                        e.stopPropagation(); // Ngăn sự kiện click lan truyền ra ngoài
                        const newLang = e.currentTarget.dataset.lang;
                        setLanguage(newLang); // Gọi lại hàm để chuyển đổi ngôn ngữ
                    });

                    langOptions.appendChild(langButton);
                }
            }
        });

        // Lưu ngôn ngữ đã chọn vào Local Storage
        localStorage.setItem('selectedLang', lang);
    }

    // --- KHỞI TẠO BAN ĐẦU ---
    const savedLang = localStorage.getItem('selectedLang') || 'vi'; // Mặc định là Tiếng Việt
    setLanguage(savedLang); // Gọi hàm để thiết lập ngôn ngữ ban đầu



// --- KHỐI XỬ LÝ CHUYỂN ĐỔI NGÔN NGỮ (Dropdown) ---
// Xử lý sự kiện cho dropdown ngôn ngữ

    const switcher = document.querySelector('.language-switcher');
    const dropdown = document.querySelector('.lang-options');
    let dropdownTimeout;
    // Thiết lập trạng thái ban đầu của dropdown
    dropdown.style.display = 'none';
    // Khi rê chuột vào switcher, hiển thị dropdown
    switcher.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimeout);
        dropdown.style.display = 'flex';
        requestAnimationFrame(() => {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
        });
    });

    // Khi rời chuột khỏi switcher, ẩn dropdown sau 200ms (để tránh nhấp bị hụt)
    switcher.addEventListener('mouseleave', () => {
        dropdownTimeout = setTimeout(() => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 300); // trùng với thời gian transition CSS
        }, 100);
    });


// --- KHỐI XỬ LÝ PHÍM ENTER ĐỂ SUBMIT ---

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const activeForm = document.querySelector('.active-form');

        // Đăng nhập
        if (activeForm && activeForm.id === 'login-form') {
            document.getElementById('login-button')?.click();
        }

        // Đăng ký
        if (activeForm && activeForm.id === 'register-form') {
            document.getElementById('register-button')?.click();
        }

        // Quên mật khẩu
        if (activeForm && activeForm.id === 'forgot-form') {
            document.getElementById('reset-password-button')?.click();
        }
    }
});






