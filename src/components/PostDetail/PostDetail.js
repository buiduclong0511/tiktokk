import HomeContainer from '~/containers/Home'

export default function PostDetail({
    post
}) {
    return (
        <HomeContainer except={post.uuid} postDetail={post} />
    )
}