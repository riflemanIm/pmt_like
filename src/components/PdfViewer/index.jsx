"use client";
import React, { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
import Loading from "../Loading";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "./PdfViewer.module.css";
import { Stack, Alert, AlertTitle, useMediaQuery } from "@mui/material";
// Устанавливаем версию PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfView({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }
  const handleDocLoadError = (err) => {
    console.log("err", err);
    setError(
      err.name === "MissingPDFException"
        ? "Фаил не найден"
        : "Внутрення ошибка сервера"
    );
  };

  return error != null ? (
    <Stack sx={{ width: "100%", mt: 6 }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.name}
      </Alert>
    </Stack>
  ) : (
    <div className={styles.Example}>
      <div className={styles.Example__container}>
        <div className={styles.Example__container__document}>
          <Document
            file={url}
            loading={<Loading />}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={handleDocLoadError}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={isMobile ? 1 : 1.5}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
