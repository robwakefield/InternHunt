import React, { useState } from "react";
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import ConvertApi from 'convertapi-js';

function str2xml(str) {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}

// Get paragraphs as javascript array
function getParagraphs(content) {
  const zip = new PizZip(content);
  const xml = str2xml(zip.files["word/document.xml"].asText());
  const paragraphsXml = xml.getElementsByTagName("w:p");
  const paragraphs = [];

  for (let i = 0, len = paragraphsXml.length; i < len; i++) {
    let fullText = "";
    const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
    for (let j = 0, len2 = textsXml.length; j < len2; j++) {
      const textXml = textsXml[j];
      if (textXml.childNodes) {
        fullText += textXml.childNodes[0].nodeValue;
      }
    }
    if (fullText) {
      paragraphs.push(fullText);
    }
  }
  return paragraphs;
}

const DocxExtractor = (props) => {
  const onFileUpload = (event) => {
    const reader = new FileReader();
    let file = event.target.files[0];
    var extractedCV= ""
    
    // Convert to PDF and send to database
    let convertApi = ConvertApi.auth('DsS5CGKucVlsl6S7');
    let params = convertApi.createParams();
    params.add('File', event.target.files[0]);
    convertApi.convert('docx', 'pdf', params).then((result) => {
      if (result.dto.Files.length == 0) return;
      fetch(result.dto.Files[0].Url).then((res) => res.blob()).then((blob) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
          var base64data = reader.result;
          props.setApplication({ ...props.application, cv: base64data, extractedCV: extractedCV  });
          fetch("/api/cv", {
            method: "PUT",
            body: JSON.stringify({
              postID: props.postID,
              studentID: props.studentID,
              cv: base64data
            })
          });
        }
      })
    });

    reader.onload = (e) => {
      const content = e.target.result;
      const paragraphs = getParagraphs(content);
      extractedCV = paragraphs.join("\n")
      props.setApplication({ ...props.application, extractedCV: extractedCV });
      fetch("/api/updateExtractedCV", {
        method: "PUT",
        body: JSON.stringify({
          postID: props.postID,
          studentID: props.studentID,
          extractedCV: extractedCV
        })
      });
    };

    reader.onerror = (err) => console.error(err);

    reader.readAsBinaryString(file);
  };

  return (<div><input type="file" accept=".doc, .docx" onChange={onFileUpload} name="docx-reader" /></div>);
};

export default DocxExtractor;