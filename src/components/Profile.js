import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../scss/Profile.scss";
import ProfileImg from "../images/profile.jpg";
import Post from "./Post";

const Profile = () => {
  return (
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
      <Post />
    </Container>
  );
};

export default Profile;
