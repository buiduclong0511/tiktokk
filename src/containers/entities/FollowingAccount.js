import BaseEntity from './BaseEntity'

export default class FollowingAccount extends BaseEntity {
    static type = 'followingAccount'

    get name() {
        return this.first_name + ' ' + this.last_name
    }

    get short_name() {
        return this.first_name.charAt(0).toUpperCase() + this.last_name.charAt(0).toUpperCase()
    }
}

Object.defineProperty(BaseEntity.subClasses, FollowingAccount.type, {
    value: FollowingAccount,
})