import { useEffect, useState, useContext } from "react";
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import "../scss/Profile.scss";
import ProfileImg from "../images/profile.jpg";
import AuthContext from "../context/context";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { array } from "yargs";

const Profile = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const [modalIma, setModalImg] = useState("");
  const [likes, setLikes] = useState("");
  const [id, setId] = useState("");
  const [caption, setCaption] = useState("")
  const [tags, setTags] = useState[""]
  const [tagsModal, setTagModals] = useState("")


  const ctxData = useContext(AuthContext);
  const postData = ctxData.apiData

  console.log(postData)

  const posts = postData[0].map(post => {
    console.log(post)
    return (
      <>
        <Col xl={4} md={4} lg={4}>
          <Card className="cardImage" onClick={() => { setModalShow(true); setModalImg(post.image); setLikes(post.likes); setId(post.id); setCaption(post.text); setTags(post.tags)}}>
            <Card.Img src={post.image} rounded />
            <Card.ImgOverlay className="cardInfo">
              <span className="imageLikes"><FontAwesomeIcon className="navIcons" icon={faHeart} />{post.likes}</span>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </>
    )
  })

  
  // const tagsSpread = () => {
  //   for (const i=0; i<tags.length; i++){
  //     setTagModals("#" + tags[i])
  //   }
  // }

  console.log(tagsModal)
  return (
    <>
      <Container>
        <Row className="profileArea">
          <Col xl={4} l={4} md={4} className="profilePic">
            <img src={ProfileImg} alt="" />
          </Col>
          <Col xl={8} l={8} md={8} className="personalInfo">
            <div className="personalTop">
              <h3 className="userName">dgknygtr</h3>
              <a href="">Edit Profile</a>
            </div>
            <div className="personalMiddle">
              <span className="totalPost">
                <b>200</b> Post
              </span>
              <a href="">
                <b>200</b> Followers
              </a>
              <a href="">
                <b>200</b> Following
              </a>
            </div>
            <div className="personalBottom">
              <h6>Biography</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                quaerat cumque necessitatibus. Illo sapiente iusto hic enim
                placeat recusandae commodi alias pariatur esse odio, fugit
                voluptatum repellendus ipsam odit dicta?
              </p>
            </div>
          </Col>
        </Row>
        <Row className="pictureArea">
          {posts}
        </Row>
      </Container>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={handleClose}
      >
        <Container className="modalPost">
          <Row>
            <Col xl={8} l={8} md={8} className="modalImage"><img src={modalIma} alt="" /></Col>
            <Col xl={4} l={4} md={4} className="modalInfo">
                <div className="modalProfile">
                  <div className="modalProfileImage">
                    <img src={ProfileImg} alt="" />
                    <span>
                      dgknygtr
                    </span>
                  </div>
                  <div className="modalProfileInfo">
                    <span>{caption}</span>
                    <span>{tagsModal}</span>
                  </div>
                </div>
                <div className="modalComments"></div>
                <div className="modalInteraction">
                <FontAwesomeIcon className="navIcons" icon={farHeart} />
                <span><b>{likes}</b>Likes</span>
                </div>
                <div className="modalInput" >
                  <input type="text" placeholder="Add Comment"/>
                  <button>Share</button>
                </div>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
};

export default Profile;
