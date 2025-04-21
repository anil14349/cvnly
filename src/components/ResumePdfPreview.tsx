import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ResumeSection } from '../types/common';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 32,
    fontFamily: 'Helvetica',
    fontSize: 12,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 18,
    paddingBottom: 8,
    borderBottom: '1px solid #e2e8f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  content: {
    fontSize: 12,
    color: '#222',
  }
});

interface ResumePdfDocumentProps {
  resumeData: { name: string; title: string };
  sections: ResumeSection[];
  sectionTitles: Record<string, string>;
}

const ResumePdfDocument: React.FC<ResumePdfDocumentProps> = ({ resumeData, sections, sectionTitles }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.section}>
        <Text style={styles.title}>{resumeData.name}</Text>
        <Text style={styles.subtitle}>{resumeData.title}</Text>
      </View>
      {sections.filter((s: ResumeSection) => s.visible).map((section: ResumeSection) => (
        <View style={styles.section} key={section.type} wrap>
          <Text style={styles.title}>{sectionTitles[section.type]}</Text>
          {/* Section content rendering placeholder */}
          <Text style={styles.content}>Section content goes here...</Text>
        </View>
      ))}
    </Page>
  </Document>
);

interface ResumePdfPreviewProps {
  resumeData: { name: string; title: string };
  sections: ResumeSection[];
  sectionTitles: Record<string, string>;
}

const ResumePdfPreview: React.FC<ResumePdfPreviewProps> = ({ resumeData, sections, sectionTitles }) => (
  <div style={{ width: '100%', height: 800, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
    <PDFViewer width="100%" height="100%" showToolbar>
      <ResumePdfDocument resumeData={resumeData} sections={sections} sectionTitles={sectionTitles} />
    </PDFViewer>
  </div>
);

export default ResumePdfPreview;
