import BaseEntity from './BaseEntity'
export default class ProfileUser extends BaseEntity {
    static type = 'profileUser'

    get name() {
        return this.first_name + ' ' + this.last_name
    }

    get shortName() {
        return this.first_name.charAt(0).toUpperCase() + this.last_name.charAt(0).toUpperCase()
    }

    get followingsCount() {
        return this.followings_count
    }

    get followersCount() {
        return this.followers_count
    }

    get likesCount() {
        return this.likes_count
    }
}

Object.defineProperty(BaseEntity.subClasses, ProfileUser.type, {
    value: ProfileUser,
})