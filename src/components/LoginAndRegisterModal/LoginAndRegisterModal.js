import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from './LoginAndRegisterModal.module.scss'
import Button from '~/packages/duclong-button'
import MessageBox from '~/components/MessageBox'

export default function LoginAndRegisterModal({
    isLoginScreen = true,
    disableBtn = false,
    onCloseRequest = () => {},
    onShowRegisterScreen = () => {},
    onShowLoginScreen = () => {},
    emailLogin = '',
    passwordLogin = '',
    onchangeEmailLogin = () => {},
    onchangePasswordLogin = () => {},
    emailRegister = '',
    passwordRegister = '',
    confirmPasswordRegister = '',
    onchangeEmailRegister = () => {},
    onchangePasswordRegister = () => {},
    onchangeConfirmPasswordRegister = () => {},
    onLogin = () => {},
    onRegister = () => {},
    error = null,
    showErrorMessage = false,
    onClose,
    onKeyUpLogin = () => {},
    onGetLoginBtnRef = () => {}
}) {
    const title = isLoginScreen ? 'Đăng nhập' : 'Đăng ký'
    return (
        <div className={styles.wrapper}>
            {showErrorMessage ? <MessageBox 
                message={error.message}
                title={error.title}
                type={error.type}
                onClose={onClose}
            /> : <></>}
            <div className={styles.overlay}>
                {isLoginScreen ? (
                    <div className={styles.form}>
                        <button 
                            className={styles.btnClose}
                            onClick={() => onCloseRequest()}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h2 className={styles.heading}>{title}</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="inputEmail" className={styles.title}>Email</label>
                            <input value={emailLogin} onChange={(e) => onchangeEmailLogin(e.target.value)} onKeyUp={onKeyUpLogin} type="email" className={styles.input} id="inputEmail" placeholder="Nhập email"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="inputPass" className={styles.title}>Mật khẩu</label>
                            <input value={passwordLogin} onChange={(e) => onchangePasswordLogin(e.target.value)} onKeyUp={onKeyUpLogin} type="password" className={styles.input} id="inputPass" placeholder="Nhập mật khẩu"/>
                        </div>
                        <p className={styles.forgetPassword}>Quên mật khẩu?</p>
                        <div ref={onGetLoginBtnRef} onClick={onLogin} ><Button title={title} size="fullSize" disabled={disableBtn} /></div>
                        <p className={styles.footer}>
                            <span>Bạn không có tài khoản? </span>
                            <button className={styles.switchToRegister} onClick={() => onShowRegisterScreen()}>Đăng ký</button>
                        </p>
                    </div>
                ) : (
                    <div className={styles.form}>
                        <button 
                            className={styles.btnClose}
                            onClick={() => onCloseRequest()}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h2 className={styles.heading}>{title}</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="inputEmail" className={styles.title}>Email</label>
                            <input value={emailRegister} onChange={(e) => onchangeEmailRegister(e.target.value)} type="email" className={styles.input} id="inputEmail" placeholder="Nhập email"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="inputPass" className={styles.title}>Mật khẩu</label>
                            <input value={passwordRegister} onChange={(e) => onchangePasswordRegister(e.target.value)} type="password" className={styles.input} id="inputPass" placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="inputPass" className={styles.title}>Xác nhận mật khẩu</label>
                            <input value={confirmPasswordRegister} onChange={(e) => onchangeConfirmPasswordRegister(e.target.value)} type="password" className={styles.input} id="inputPass" placeholder="Nhập lại mật khẩu"/>
                        </div>
                        <Button title={title} size="fullSize" disabled={disableBtn} onClick={onRegister} />
                        <p className={styles.footer}>
                            <span>Bạn đã có tài khoản? </span>
                            <button className={styles.switchToRegister} onClick={() => onShowLoginScreen()}>Đăng nhập</button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}