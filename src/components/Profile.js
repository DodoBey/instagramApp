import { useEffect, useState, useContext } from "react";
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import "../scss/Profile.scss";
import ProfileImg from "../images/profile.jpg";
import AuthContext from "../context/context";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";

const Profile = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const [modalImg, setModalImg] = useState("");
  const [likes, setLikes] = useState("");
  const [id, setId] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeIcon, setLikeIcon] = useState(farHeart);

  const ctxData = useContext(AuthContext);
  const postData = ctxData.apiData;
  const commentData = ctxData.comments;

  console.log(commentData)

  // Post map method
  const posts = postData.map((post, key) => {
    return (
      <Col xl={4} md={4} lg={4} key={post.id}>
        <Card
          className="cardImage"
          onClick={(e) => {
            e.persist();
            setModalShow(true);
            setModalImg(post.image ? post.image : post);
            setLikes(post.likes || null);
            setId(post.id || null);
            setCaption(post.text || null);
            setTags(post.tags || null);
            getComments(post.id)
          }}
        >
          <Card.Img src={post.image ? post.image : post} rounded />
          <Card.ImgOverlay className="cardInfo">
            <span className="imageLikes">
              <FontAwesomeIcon className="navIcons" icon={faHeart} />
              {post.likes}
            </span>
          </Card.ImgOverlay>
        </Card>
      </Col>
    );
  });

  // Send ID To Context to Fetch Comment Endpoint
  const getComments = (id) => {
    ctxData.dispatchImage({ type: "GET_COMMENT", payload: id })
  }

  // Comment map method
  const comments = commentData.map((comment, key) => {
    return (
    <div className="commentArea" key={comment.id}>
          <div className="commentSection">
          <div className="commentImage">
            <img src={comment.owner.picture} alt="" />
          </div>
          <div className="comment">
            <span><b>{comment.owner.firstName}</b> <b>{comment.owner.lastName}</b></span>
            <span>{comment.message}</span>
          </div>
        </div>
        <div className="commentDate">
          <span>{comment.publishDate}</span>
        </div>
    </div>
    )
  })
  

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
                <b>{postData.length}</b> Post
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
        <Row className="pictureArea">{posts}</Row>
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
            <Col xl={8} l={8} md={8} className="modalImage">
              <img src={modalImg} alt="" />
            </Col>
            <Col xl={4} l={4} md={4} className="modalInfo">
              <div className="modalProfile">
                <div className="modalProfileImage">
                  <img src={ProfileImg} alt="" />
                  <span>dgknygtr</span>
                </div>
                <div className="modalProfileInfo">
                  <span>{caption}</span>
                  <span>#{tags && tags.join("#")}</span>
                </div>
              </div>
              <div className="modalComments">
                {comments}
              </div>
              <div className="modalInteraction">
                <span onClick={() => setLikeIcon(faHeart)}>
                  <FontAwesomeIcon className="navIcons" icon={likeIcon} />
                </span>
                <span>
                  <b>{likes}</b>Likes
                </span>
              </div>
              <div className="modalInput">
                <input type="text" placeholder="Add Comment" />
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
