import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Configure quality and compression settings to keep file size under 1MB
export const generatePDF = async () => {
  const resumeElement = document.getElementById("resume");
  if (!resumeElement) return;

  try {
    // Show loading state or notification
    console.log("Generating PDF...");

    // Quality settings for canvas (scale determines the resolution)
    const scale = 2; // Higher values = better quality but larger file size

    console.log(
      "resumeElement.offsetWidth",
      resumeElement.offsetWidth,
      resumeElement.offsetHeight,
    );
    const canvas = await html2canvas(resumeElement, {
      scale: scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
      // Force pixel ratio to 1 to avoid scaling issues
      windowWidth: resumeElement.offsetWidth,
      windowHeight: resumeElement.offsetHeight,
      // Use better font rendering
      backgroundColor: "#ffffff",
      imageTimeout: 0,
    });

    console.log("canvas", canvas);

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF with compression settings
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Convert canvas to image with quality settings
    const imgData = canvas.toDataURL("image/jpeg", 0.85); // JPEG with 85% quality

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(
      imgData,
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST",
    );
    heightLeft -= pageHeight;

    // Add subsequent pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST",
      );
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save("resume.pdf");

    console.log("PDF generated successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
