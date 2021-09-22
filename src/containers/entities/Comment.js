import moment from 'moment'

import BaseEntity from './BaseEntity'
import Account from './Account'

export default class Comment extends BaseEntity {
    static type = 'comment'

    get author() {
        return Account.create(this.user)
    }

    get relativeTime() {
        return moment(this.created_at).fromNow();
    }
}

Object.defineProperty(BaseEntity.subClasses, Comment.type, {
    value: Comment,
})