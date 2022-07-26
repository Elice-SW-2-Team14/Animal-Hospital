import React, { useState } from "react";
import Dropzone from "react-dropzone";
// import { Icon } from "antd";
import axios from "axios";

function ImgUploader({ updateImg }: any) {
  const [Imgs, setImgs] = useState([]);
  const onhandleDrop = (files: any) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/fomr-data" },
    };
    formData.append("file", files[0]);
    // 파일을 보낼때 해줘야 하는 것들
    // axios
    //   .post("/api/product/image", formData, config) //
    //   .then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data);
    //       setImgs([...Imgs, res.data]);
    //       updateImg([...Imgs, res.data]);
    //     } else {
    //       console.log("실패");
    //     }
    //   });
  };
  // const onhandleDelete = (img) => {
  //   const currIdx = Imgs.indexOf(img);
  //   const delImg = Imgs.filter((img, idx) => idx !== currIdx);
  //   updateImg(delImg);
  //   setImgs(delImg);
  // };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Dropzone onDrop={onhandleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                style={{
                  width: 300,
                  height: 240,
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {/* <Icon type="plus" style={{ fontSize: "2rem" }} /> */}
              </div>
            </section>
          )}
        </Dropzone>
        <div
          style={{
            display: "flex",
            width: "350px",
            height: "240px",
            overflowX: "scroll",
          }}
        >
          {/* {Imgs.map((img, idx) => (
            <div onClick={() => onhandleDelete(img)} key={idx}>
              <img
                style={{
                  minWidth: "300px",
                  width: "300px",
                  height: "225px",
                  padding: "0.5px",
                }}
                src={`http://kdt-sw2-seoul-team14.elicecoding.com:5000/${img.filePath}`}
              />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default ImgUploader;
