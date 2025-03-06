const express = require("express");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.post("/compress", upload.single("pdf"), async (req, res) => {
    try {
        const fileBuffer = fs.readFileSync(req.file.path);
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: true });

        res.setHeader("Content-Type", "application/pdf");
        res.send(compressedPdfBytes);

        fs.unlinkSync(req.file.path); // Delete uploaded file after processing
    } catch (err) {
        res.status(500).send("Error compressing PDF");
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
