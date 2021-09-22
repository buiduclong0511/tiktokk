import moment from 'moment'

import BaseEntity from './BaseEntity'
import Account from './Account'

export default class Post extends BaseEntity {
    static type = 'post'

    get userId() {
        return this.user_id
    }

    get fileUrl() {
        return this.file_url
    }

    get ratio() {
        return this.meta.video.resolution_x / this.meta.video.resolution_y
    }

    get relativeTime() {
        return moment(this.published_at).fromNow();
    }

    get shortName() {
        return '' + this.user.first_name.charAt(0).toUpperCase() + this.user.last_name.charAt(0).toUpperCase()
    }

    get author() {
        return Account.create(this.user)
    }

    get likesCount() {
        return this.likes_count
    }

    get commentsCount() {
        return this.comments_count
    }

    get sharesCount() {
        return this.shares_count
    }

    get viewsCount() {
        return this.views_count
    }
}

Object.defineProperty(BaseEntity.subClasses, Post.type, {
    value: Post,
})