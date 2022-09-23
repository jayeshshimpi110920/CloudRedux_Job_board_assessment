import React from "react";

const UploadForm = () => {

    const uploadFile = ({ target: { files } }) => {
        let data = new FormData();
        data.append("file", files[0]);
    };
    return (
        <>
            <div style={{marginTop:'20px'}}>
                <div className="col-md-6 text-center">
                    <h2>Upload your Resume</h2>
                        <input
                        style={{margin:'20px 0px'}}
                            type="file"
              
                            onChange={uploadFile}
                        />
                </div>
            </div>
        </>
    );
};

export default UploadForm;