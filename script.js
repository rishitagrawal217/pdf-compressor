async function uploadPDF() {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');
    const downloadLink = document.getElementById('downloadLink');

    if (!fileInput.files.length) {
        status.innerText = "Please select a PDF file.";
        return;
    }

    status.innerText = "Uploading...";
    const formData = new FormData();
    formData.append("pdf", fileInput.files[0]);

    const response = await fetch("https://your-backend-url.com/compress", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.style.display = "block";
        downloadLink.innerText = "Download Compressed PDF";
        status.innerText = "Compression complete!";
    } else {
        status.innerText = "Compression failed!";
    }
}
