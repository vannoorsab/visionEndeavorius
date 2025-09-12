import jsPDF from 'jspdf';

interface CertificateData {
  userName: string;
  activityTitle: string;
  completedDate: string;
}

export function generateCertificate(data: CertificateData): jsPDF {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Set up colors
  const primaryColor = [59, 130, 246]; // Blue
  const secondaryColor = [16, 185, 129]; // Green
  const textColor = [15, 23, 42]; // Dark slate

  // Add border
  pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.setLineWidth(3);
  pdf.rect(10, 10, 277, 190);
  
  pdf.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  pdf.setLineWidth(1);
  pdf.rect(15, 15, 267, 180);

  // Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(28);
  pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.text('Certificate of Appreciation', 148.5, 50, { align: 'center' });

  // Subtitle
  pdf.setFontSize(16);
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.text('Vision Endeavours', 148.5, 65, { align: 'center' });

  // Main text
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(14);
  pdf.text('This is to certify that', 148.5, 90, { align: 'center' });

  // User name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.text(data.userName, 148.5, 110, { align: 'center' });

  // Activity text
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(14);
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.text('has successfully completed the volunteering activity', 148.5, 125, { align: 'center' });

  // Activity title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  pdf.text(data.activityTitle, 148.5, 145, { align: 'center' });

  // Date and signature area
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  // Date
  pdf.text('Date:', 60, 175);
  pdf.text(data.completedDate, 60, 185);
  pdf.line(45, 190, 120, 190);

  // Director signature
  pdf.text('Director:', 200, 175);
  pdf.text('Vision Endeavours', 200, 185);
  pdf.line(180, 190, 255, 190);

  // Add decorative trophy
  pdf.setFontSize(40);
  pdf.text('🏆', 148.5, 170, { align: 'center' });

  return pdf;
}

export function downloadCertificate(data: CertificateData): void {
  const pdf = generateCertificate(data);
  const filename = `${data.userName.replace(/\s+/g, '_')}_${data.activityTitle.replace(/\s+/g, '_')}_Certificate.pdf`;
  pdf.save(filename);
}
