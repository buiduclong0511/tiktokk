import axios from 'axios'
import { useState, useRef } from 'react'
import { getThumbnails } from 'video-metadata-thumbnails'
import * as _ from 'lodash'

import UploadComponent from '~/components/Upload'

function Upload() {
    const [videoUrl, setVideoUrl] = useState('')
    const [showInstructure, setShowInstructure] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [showWarning, setShowWarning] = useState(false)
    const [thumbnails, setThumbnails] = useState([])
    const currentTimeOfThumbnail = useRef(null)
    const fileUpload = useRef(null)
    const [viewMode, setViewMode] = useState('public')
    const [allows, setAllows] = useState(['comment'])
    const [error, setError] = useState(null)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleGetVideoUrl = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            fileUpload.current = file
            const blobURL = URL.createObjectURL(file)
            setVideoUrl(blobURL)
            setShowInstructure(false)
        }
    }

    const handleChangeCurrentTimeOfThumbnail = currentTime => {
        currentTimeOfThumbnail.current = currentTime
    }

    const handleClose = () => {
        if (thumbnails.length > 0) {
            setVideoUrl('')
            setShowInstructure(true)
        }
    }

    const handleChangeInputValue = e => {
        if (e.target.value.length <= 150) {
            setInputValue(e.target.value)
            setShowWarning(false)
        } else {
            const newInputValue = e.target.value
            setInputValue(newInputValue.slice(0, 150))
            setShowWarning(true)
        }
    }
    
    const handleVideoChangeURL = async ref => {
        if (ref) {
            ref.onloadedmetadata = async () => {
                if (thumbnails.length > 0) return

                const result = await getThumbnails(videoUrl, {
                    quality: 0.6,
                    interval: ref.duration / 7
                })
                setThumbnails(result.map(item => URL.createObjectURL(item.blob)))
            }
        }
    }

    const handleClearThumbnails = () => {
        setThumbnails([])
    }

    const handleUpload = async () => {
        if (inputValue.trim()) {
            const formData = new FormData()
            formData.append('description', inputValue)
            formData.append('upload_file', fileUpload.current)
            formData.append('type', 'video')
            formData.append('viewable', viewMode)
            formData.append('thumbnail_time', Math.floor(currentTimeOfThumbnail.current))
            allows.forEach(allow => {
                formData.append('allows[]', allow)
            })
            try {
                setIsLoading(true)
                const res = await axios.post('/api/posts', formData)
                setError({
                    title: 'Thông báo',
                    message: 'Thành công',
                    type: 'success'
                })
                setShowErrorMessage(true)
                setVideoUrl('')
                setShowInstructure(true)
                setInputValue('')
                handleClearThumbnails()
                setTimeout(() => setShowErrorMessage(false), 2500)
            } catch (err) {
                setError({
                    title: 'Lỗi',
                    message: 'Có lỗi xảy ra!',
                    type: 'error'
                })
                setShowErrorMessage(true)
                setTimeout(() => setShowErrorMessage(false), 2500)
                handleClearThumbnails()
            } finally {
                setIsLoading(false)
            }
        } else {
            setError({
                title: 'Lỗi',
                message: 'Vui lòng nhập chú thích!',
                type: 'error'
            })
            setShowErrorMessage(true)
            setTimeout(() => setShowErrorMessage(false), 2500)
        }
    }

    const handleChangeViewMode = e => {
        setViewMode(e.target.value)
    }

    const handleChangeAllows = e => {
        if (e.target.checked) {
            setAllows([...allows, e.target.value])
        } else {
            const newAllows = [...allows]
            _.remove(newAllows, allow => allow === e.target.value)
            setAllows(newAllows)
        }
    }

    return (
        <UploadComponent 
            videoUrl={videoUrl}
            onGetVideoUrl={handleGetVideoUrl}
            showInstructure={showInstructure}
            onClose={handleClose}
            inputValue={inputValue}
            onChangeInputValue={handleChangeInputValue}
            showWarning={showWarning}
            onVideoChangeURL={handleVideoChangeURL}
            thumbnails={thumbnails}
            onClearThumbnails={handleClearThumbnails}
            onChangeCurrentTimeOfThumbnail={handleChangeCurrentTimeOfThumbnail}
            onUpload={handleUpload}
            onChangeViewMode={handleChangeViewMode}
            onChangeAllows={handleChangeAllows}
            viewMode={viewMode}
            allows={allows}
            error={error}
            showErrorMessage={showErrorMessage}
            onCloseMessage={() => {
                setShowErrorMessage(false)
            }}
            isLoading={isLoading}
        />
    )
}

export default Upload