import { useState, useRef } from 'react'

import AppPromotionComponent from '~/components/AppPromotion'

function AppPromotion() {
    const [phoneNumberValue, setPhoneNumberValue] = useState('')
    const modalDownloadRef = useRef(null)

    const handleGetWrapperRef = ref => {
        window.onscroll = () => {
            if (ref) {
                if (window.scrollY > 100) {
                    ref.style.bottom = '2px'
                } else {
                    ref.style.bottom = '-35px'
                }
            }
        }
    }

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const handleChangePhoneNumberValue = e => {
        setPhoneNumberValue(e.target.value)
    }

    const handleGetModalDownload = ref => {
        modalDownloadRef.current = ref
    }

    //transform: translate(-50%, -50%) scale(1);

    const handleClickDownload = () => {
        modalDownloadRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    const handleCloseModalDownload = () => {
        modalDownloadRef.current.style.transform = 'translate(-50%, -50%) scale(0)'
    }

    return (
        <AppPromotionComponent
            onGetWrapperRef={handleGetWrapperRef}
            onScrollTop={handleScrollTop}
            value={phoneNumberValue}
            onChangeValue={handleChangePhoneNumberValue}
            onGetModalDownload={handleGetModalDownload}
            onClickDownload={handleClickDownload}
            onCloseModalDownload={handleCloseModalDownload}
        />
    )
}

export default AppPromotion