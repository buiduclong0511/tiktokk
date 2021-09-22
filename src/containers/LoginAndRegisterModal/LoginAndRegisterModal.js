import { useState, useRef } from 'react'
import axios from 'axios'

import LoginAndRegisterModalComponent from '~/components/LoginAndRegisterModal'

export default function LoginAndRegisterModal({
    onCloseRequest
}) {
    const [showLoginScreen, setShowLoginScreen] = useState(true)
    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [emailRegister, setEmailRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
    const [confirmPasswordRegister, setConfirmPasswordRegister] = useState('')
    const [error, setError] = useState(null)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const loginBtnRef = useRef(null)
    
    const handleLogin = async () => {
        try {
            const res = await axios.post('/api/auth/login', {
                email: emailLogin,
                password: passwordLogin
            })
            window.localStorage.setItem('token', res.meta.token)
            setError(null)
            setShowErrorMessage(false)
            window.location.reload()
        } catch(err) {
            switch(err.response.status) {
                case 401: {
                    setError({
    
                        title: 'Lỗi đăng nhập',
                        message: 'Email hoặc mật khẩu không chính xác!',
                        type: 'error'
                    })
                    break;
                }
                case 422: {
                    setError({
    
                        title: 'Lỗi đăng nhập',
                        message: 'Email không đúng định dạng!',
                        type: 'error'
                    })
                    break;
                }
                default: {
                    setError({
    
                        title: 'Lỗi đăng nhập',
                        message: 'Có lỗi xảy ra!',
                        type: 'error'
                    })
                }
            }
            setShowErrorMessage(true)
        }
    }

    const handleRegister = async () => {
        if (confirmPasswordRegister === passwordRegister) {
            try {
                const res = await axios.post('/api/auth/register', {
                    type: 'email',
                    email: emailRegister,
                    password: passwordRegister
                })
                window.localStorage.setItem('token', res.meta.token)
                setError(null)
                setShowErrorMessage(false)
                window.location.reload()
            } catch(err) {
                switch(err.response.status) {
                    case 422: {
                        setError({
                            title: 'Lỗi đăng ký',
                            message: 'Email hoặc mật khẩu đăng ký không đúng định dạng!',
                            type: 'error'
                        })
                        break
                    }
                    case 409: {
                        setError({
                            title: 'Lỗi đăng ký',
                            message: 'Email đã được đăng ký!',
                            type: 'error'
                        })
                        break
                    }
                    default: {
                        setError({
                            title: 'Lỗi đăng ký',
                            message: 'Có lỗi xảy ra!',
                            type: 'error'
                        })
                    }
                }
                setShowErrorMessage(true)
            }
        } else {
            setError({
                title: 'Lỗi đăng ký',
                message: 'Nhập lại mật khẩu không đúng!',
                type: 'warning'
            })
            setShowErrorMessage(true)
        }
    }

    const handleKeyUpLogin = e => {
        if (e.code === 'Enter' && loginBtnRef.current) {
            loginBtnRef.current.click()
        }
    }
    const handleGetLoginBtnRef = ref => {
        loginBtnRef.current = ref
    }

    return <LoginAndRegisterModalComponent 
        emailLogin={emailLogin}
        passwordLogin={passwordLogin}
        onchangeEmailLogin={(text) => setEmailLogin(text)}
        onchangePasswordLogin={(text) => setPasswordLogin(text)}
        emailRegister={emailRegister}
        passwordRegister={passwordRegister}
        confirmPasswordRegister={confirmPasswordRegister}
        onchangeEmailRegister={(text) => setEmailRegister(text)}
        onchangePasswordRegister={(text) => setPasswordRegister(text)}
        onchangeConfirmPasswordRegister = {(text) => setConfirmPasswordRegister(text)}
        isLoginScreen={showLoginScreen} 
        onCloseRequest={onCloseRequest}
        onShowRegisterScreen={() => setShowLoginScreen(false)}
        onShowLoginScreen={() => setShowLoginScreen(true)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        error={error}
        showErrorMessage={showErrorMessage}
        onClose={() => setShowErrorMessage(false)}
        onKeyUpLogin={handleKeyUpLogin}
        onGetLoginBtnRef={handleGetLoginBtnRef}
    />
}