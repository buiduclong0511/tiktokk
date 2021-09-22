import BaseEntity from './BaseEntity'

export default class Account extends BaseEntity {
    static type = 'account'

    get name() {
        return this.first_name + ' ' + this.last_name
    }

    get shortName() {
        return this.first_name.charAt(0).toUpperCase() + this.last_name.charAt(0).toUpperCase()
    }
}

Object.defineProperty(BaseEntity.subClasses, Account.type, {
    value: Account,
})