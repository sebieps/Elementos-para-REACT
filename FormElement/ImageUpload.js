import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  
  const filePickerRef = useRef(true);

    useEffect(() => {
        if(!file){          
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);        
        fileReader.onload = () =>{
            setPreviewUrl(fileReader.result);
        }
        // console.log('preview' + previewUrl);
    }, [file]);


  const pickedHandler = (event) => {    
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {      
      pickedFile = event.target.files[0];         
      setFile(pickedFile);      
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <>
      <div className="form-control">
        <input
          id={props.id}
          ref={filePickerRef}
          type="file"
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          <div className="image-upload__preview">
            {previewUrl && <img src={previewUrl} alt="preview" />}
            {!previewUrl && <p>Please pick an image.</p>}
          </div>
          <Button type="button" onClick={pickImageHandler}>
            PICK IMAGE
          </Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </>
  );
};
export default ImageUpload;
