import { useEffect, useState } from "react";
import "../scss/Post.scss";
import { Button, Container, Row, Col } from "react-bootstrap";

const Post = () => {
  //let imagesObject = [];
  const [image, setImage] = useState();
  const [URIScheme, setURIScheme] = useState();

  const handleFileSelect = (e) => {
    console.log(e.target.files);
    let files = e.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    //@@@
    for (let i = 0, f; (f = files[i]); i++) {
      // Only process image files.
      if (!f.type.match("image.*")) {
        return;
      }

      //@@@
      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = function (e) {
        console.log(e.target.result);
        //e.target.result === Data URI scheme of loaded image file
        setURIScheme(e.target.result);
        //displayImgData(e.target.result);

        addImage(e.target.result);
      };

      reader.readAsDataURL(f);
    }
  };

  function loadFromLocalStorage() {
    let images = JSON.parse(localStorage.getItem("images"));

    // if (images && images.length > 0) {
    //   setImage(images);

    //   //displayNumberOfImgs();
    //   //images.forEach(displayImgData);
    // }
  }

  function addImage(imgData) {
    setImage(imgData);
    // displayNumberOfImgs();
    if (image) {
      localStorage.setItem("images", JSON.stringify(image));
    }
  }

  //   function displayImgData(imgData) {
  //     let span = document.createElement("span");
  //     span.innerHTML = '<img class="thumb" src="' + imgData + '"/>';
  //     document.getElementById("list").insertBefore(span, null);
  //   }

  //   function displayNumberOfImgs() {
  //     if (image) {
  //       if (image.length > 0) {
  //         document.getElementById("state").innerHTML =
  //           image.length +
  //           " image" +
  //           (image.length > 1 ? "s" : "") +
  //           " stored in your browser";

  //         document.getElementById("deleteImgs").style.display = "inline";
  //       } else {
  //         document.getElementById("state").innerHTML =
  //           "No images stored in your browser.";
  //         document.getElementById("deleteImgs").style.display = "none";
  //       }
  //     }
  //   }

  function deleteImages() {
    setImage();
    localStorage.removeItem("images");
    //displayNumberOfImgs();
    document.getElementById("list").innerHTML = "";
  }

  //   document
  //     .getElementById("files")
  //     .addEventListener("change", handleFileSelect, false);
  //   document.getElementById("deleteImgs").addEventListener("click", deleteImages);
  loadFromLocalStorage();

  return (
    <>
      <Container className="container">
        <Row>
          <Col className="title">
            {" "}
            <h4>Select pictures to upload</h4>
          </Col>
        </Row>
        <Row>
          <Col className="selectFile">
            <input type="file" id="files" onChange={handleFileSelect} />
          </Col>
        </Row>
        <Row>
          <Col className="image">
            <div id="list">
              {URIScheme && (
                <img
                  className="thumb"
                  src={URIScheme}
                  style={{ width: "600px" }}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="dark"
              className="deleteButton"
              onClick={deleteImages}
            >
              Delete Images
            </Button>
            <Button variant="dark" className="shareButton">
              Share
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Post;
