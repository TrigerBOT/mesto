export default class UserInfo {
    constructor(profileObject) {
        this._profileName = profileObject.name;
        this._profileInfo = profileObject.about;
      }
      getUserInfo() {
        return  {
          name : document.querySelector(this._profileName).textContent,
          about : document.querySelector(this._profileInfo).textContent
        };
         
      }
      setUserInfo(newProfile)  {
        document.querySelector(this._profileName).textContent = newProfile.name;
        document.querySelector( this._profileInfo).textContent = newProfile.about;
      }
    }