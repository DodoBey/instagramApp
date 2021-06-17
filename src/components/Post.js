import { useEffect, useState, useContext, useReducer } from "react";
import "../scss/Post.scss";
import { Button, Container, Row, Col } from "react-bootstrap";
import AuthContext from "../context/context";

const sampleReducer = (sampleState, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...sampleState, value: [action.payload, ...sampleState.value] };
    default:
      return sampleState;
  }
};

const Post = () => {
  const ctx = useContext(AuthContext);
  const [sampleState, dispatchSample] = useReducer(sampleReducer, {
    value: "",
  });

  //let imagesObject = [];
  // const [image, setImage] = useState();
  const [URIScheme, setURIScheme] = useState();

  const handleFileSelect = (e) => {
    //console.log(e.target.files);
    let files = e.target.files; // FileList object
    console.log(files);

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
        //console.log(e.target.result);
        //e.target.result === Data URI scheme of loaded image file
        setURIScheme(e.target.result);
        dispatchSample("UPDATE");
        //displayImgData(e.target.result);

        addImage(e.target.result);
      };

      reader.readAsDataURL(f);
    }
  };

  function loadFromLocalStorage() {
    let images = JSON.parse(localStorage.getItem("images"));
    //setstateがある時はuseeffectを使うようにする。stateがupdateされると再レンダーされるから、useeffect使わないとinfinite loopになってしまう。
    if (images && images.length > 0) {
      ctx.setImage(images);

      //displayNumberOfImgs();
      //console.log(images);
      //images.forEach(displayImgData);
    }
  }

  function addImage(imgData) {
    console.log(imgData);
    ctx.setImage(imgData);
    //displayNumberOfImgs();
    if (ctx.image.value) {
      localStorage.setItem("images", JSON.stringify(ctx.image.value));
    }
  }

  // function displayImgData(imgData) {
  //   let span = document.createElement("span");
  //   span.innerHTML = '<img class="thumb" src="' + imgData + '"/>';
  //   document.getElementById("list").insertBefore(span, null);
  // }

  // function displayNumberOfImgs() {
  //   if (image) {
  //     if (image.length > 0) {
  //       document.getElementById("state").innerHTML =
  //         image.length +
  //         " image" +
  //         (image.length > 1 ? "s" : "") +
  //         " stored in your browser";

  //       document.getElementById("deleteImgs").style.display = "inline";
  //     } else {
  //       document.getElementById("state").innerHTML =
  //         "No images stored in your browser.";
  //       document.getElementById("deleteImgs").style.display = "none";
  //     }
  //   }
  // }

  function deleteImages() {
    ctx.setImage();
    localStorage.removeItem("images");
    //displayNumberOfImgs();
    document.getElementById("list").innerHTML = "";
  }

  //   document
  //     .getElementById("files")
  //     .addEventListener("change", handleFileSelect, false);
  //   document.getElementById("deleteImgs").addEventListener("click", deleteImages);
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

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
