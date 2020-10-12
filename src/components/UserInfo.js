export default class UserInfo {
    constructor(profileObject) {
        this._profileName = profileObject.name;
        this._profileInfo = profileObject.about;
        this._name=document.querySelector(this._profileName);
        this._about =  document.querySelector(this._profileInfo);
      }
      getUserInfo() {
        return  {
          name : this._name.textContent,
          about :this._about.textContent
        };
         
      }
      setUserInfo(newProfile)  {
        this._name.textContent = newProfile.name;
        this._about.textContent = newProfile.about;
      }
    }