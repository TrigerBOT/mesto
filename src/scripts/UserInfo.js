export default class UserInfo {
    constructor({ name, about }) {
        this._inputName = name;
        this._inputAbout = about;
    }
    getUserInfo() {
        return {
            name: this._inputName.textContent,
            about: this._inputAbout.textContent
        }

    }
    setUserInfo() {
        return {
            name: this._inputName.value,
            about: this._inputAbout.value
        }
    }
}