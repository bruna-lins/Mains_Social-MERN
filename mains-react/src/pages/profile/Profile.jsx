import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                        <img src={`${PF}posts/post5.jpg`} alt="" className="profileCoverImg" />
                        <img src={`${PF}person/person10.jpg`} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Alluka</h4>
                            <span className="profileInfoDesc">Hello, here its my bio. </span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username="bruna" />
                        <Rightbar profile/>
                    </div>
                </div>
            </div>
        </>
    );
}