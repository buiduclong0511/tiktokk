import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import PostDetailComponent from '~/components/PostDetail'
import Post from '~/containers/entities/Post'


export default function PostDetail() {
    const { videoId } = useParams(null)
    const [post, setPost] = useState(null)
    const videoRef = useRef({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        // eslint-disable-next-line
        setIsLoading(true)
        try {
            const res = await axios.get(`/api/posts/${videoId}`)
            setPost(Post.create(res.data))
        } catch(err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    if (!post) {
        return null
    }

    const handleVideoRef = (video, postId) => {
        videoRef.current = video
    }

    const handleEnter = () => {
        videoRef.current.play()
    }

    const handleLeave = () => {
        videoRef.current.pause()
    }

    return (
        <PostDetailComponent 
            post={post}
            onEnter={handleEnter}
            onVideoRef={handleVideoRef}
            onLeave={handleLeave}
            isLoading={isLoading}
        />
    )
}