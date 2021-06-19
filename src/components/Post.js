import { useContext } from "react";
import "../scss/Post.scss";
import { Button, Container, Row, Col } from "react-bootstrap";
import AuthContext from "../context/context";

const Post = () => {
  const ctx = useContext(AuthContext);

  const handleFileSelect = (e) => {
    let files = e.target.files; // FileList object
    console.log(files);

    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; (f = files[i]); i++) {
      // Only process image files.
      if (!f.type.match("image.*")) {
        return;
      }

      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = function (e) {
        console.log(e.target.result);
        ctx.dispatchImage({ type: "UPDATE", payload: e.target.result });
        localStorage.setItem("initialImage", JSON.stringify(e.target.result));
      };

      addImage(f);
      reader.readAsDataURL(f);
    }
  };

  function addImage(imgData) {
    ctx.dispatchImage({ type: "UPDATE", payload: imgData });
    if (ctx.imageState) {
      JSON.parse(localStorage.getItem("images"));
      localStorage.setItem("images", JSON.stringify(ctx.imageState));
    }
  }

  function deleteImages() {
    ctx.dispatchImage({ type: "DELETE", payload: "null" });
    localStorage.removeItem("initialImage");
    localStorage.removeItem("images");
  }

  //setstateがある時はuseeffectを使うようにする。stateがupdateされると再レンダーされるから、useeffect使わないとinfinite loopになってしまう。
  // useEffect(() => {
  //   loadFromLocalStorage();
  // }, []);

  const shareImages = () => {
    console.log(ctx.imageState);
  };

  return (
    <>
      <Container className="postContainer">
        <Row>
          <Col className="title">
            {" "}
            <h4>Select pictures to upload</h4>
          </Col>
        </Row>
        <Row>
          <Col className="selectFile">
            <input
              type="file"
              id="files"
              onChange={handleFileSelect}
              onClick={(e) => {
                e.target.value = "";
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col className="image">
            <div id="list">
              {ctx.imageState &&
                ctx.imageState.map((image, i) => {
                  return (
                    <img
                      key={i}
                      className="thumb"
                      src={typeof image === "string" ? image : ""}
                      style={{ width: "600px" }}
                    />
                  );
                })}
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
            <Button
              variant="dark"
              className="shareButton"
              onClick={shareImages}
            >
              Share
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Post;
