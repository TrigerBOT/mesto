export default class UserInfo {
    constructor(profileObject,props) {
        this._profileName = profileObject.name;
        this._profileInfo = profileObject.about;
        this._nameElement=document.querySelector(this._profileName);
        this._aboutElement =  document.querySelector(this._profileInfo);
        this._avatarElement =document.querySelector('.profile__photo')
        this._name = props.name;
        this._about = props.about;
        this._id = props._id;
        this._avatar = props.avatar;
        this._cohort = props.cohort;
      }
      getUserInfo() {
       const info =  {
        name: this._name,
        about: this._about,
        _id: this._id,
        avatar: this._avatar,
        cohort: this._cohort
        };
         return info
      }
      _renderUserInfo(){
        this._nameElement.textContent = this._name;
        this._aboutElement.textContent = this._about;
        this._avatarElement.src= this._avatar
      }
      setUserInfo(newProfile)  {
      this._name = newProfile.name;
      this._about = newProfile.about;
      this._renderUserInfo();
      }
      
      getUserId(){
        return this._id;
      }
      setUserAvatar(avatarLink){
        this._avatar = avatarLink;
        this._renderUserInfo();
      }
      getUserAvatar() {
        return this._avatar;
      }
    }