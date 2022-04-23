import "./rightbar.css"
import { Users } from "../../sampleData"
import Online from "../online/Online"

export default function Rightbar({ user }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Bruna</b> e <b> 2 other friends</b> have a birthday today
          </span>
        </div>
        <img src="assets/ad.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey"> City: </span>
            <span className="rightbarInfoValue"> {user.city} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey"> From: </span>
            <span className="rightbarInfoValue"> {user.from} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey"> Relationship: </span>
            <span className="rightbarInfoValue"> {
              user.relationship === 1 ? "Single"
                : user.relationship === 2 ? "Married"
                  : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src={`${PF}person/person2.jpg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jada Bennet</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/person5.jpg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jada Bennet</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/person1.jpg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jada Bennet</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/person9.jpg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jada Bennet</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/person8.jpg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jada Bennet</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/person6.jpg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jada Bennet</span>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
