import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Image,
} from "@react-pdf/renderer";
import { type ResumeSettings } from "~/providers/resume-provider";

// Register font
Font.register({
  family: "Source Sans Pro",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/sourcesanspro/v21/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAkA.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/sourcesanspro/v21/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vAkA.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/sourcesanspro/v21/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAmw.ttf",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Georgia",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/georgia/v17/Jqa-TJcmQ3NOQlg1WJ1HsA.ttf",
      fontWeight: "normal",
    },
  ],
});

Font.register({
  family: "Times New Roman",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/32441a782e979df7f3ea0c889026b958.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://db.onlinewebfonts.com/t/3a7fe379a56bcd86f9f88b9a99c957a0.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Arial",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/0750a0fb32dbb7aea773c959953c79c3.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://db.onlinewebfonts.com/t/66ee0ec8db3knock75bb1f3the8cd8632.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/05acfdb568c445f0708b99ebfd07c7c4.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://db.onlinewebfonts.com/t/f881fc6b1d0b4e784c5c42f616290dc9.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/05acfdb568c445f0708b99ebfd07c7c4.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://db.onlinewebfonts.com/t/f881fc6b1d0b4e784c5c42f616290dc9.ttf",
      fontWeight: "bold",
    },
  ],
});

interface ResumeTemplateProps {
  settings: ResumeSettings;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ settings }) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      fontFamily: settings.fontFamily,
      fontSize: settings.fontSize,
      letterSpacing: settings.letterSpacing,
      lineHeight: settings.lineHeight,
      color: "#333333",
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
    },
    leftColumn: {
      width: "30%",
      backgroundColor: "#f3f3f3",
      padding: 20,
      display: "flex",
      flexDirection: "column",
    },
    rightColumn: {
      width: "70%",
      padding: 20,
    },
    profileImage: {
      width: 110,
      height: 110,
      borderRadius: 55,
      marginBottom: 15,
      alignSelf: "center",
    },
    contactItem: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 8,
      fontSize: settings.fontSize - 1,
    },
    contactIcon: {
      width: 14,
      marginRight: 8,
    },
    sectionTitle: {
      fontSize: settings.fontSize + 1,
      fontWeight: "bold",
      textTransform: "lowercase",
      marginBottom: 10,
      marginTop: 15,
      color: "#555555",
    },
    skill: {
      marginBottom: 5,
    },
    mainName: {
      fontSize: settings.fontSize + 10,
      fontWeight: "bold",
      marginBottom: 5,
      color: settings.primaryColor,
    },
    mainTitle: {
      fontSize: settings.fontSize + 2,
      color: "#555555",
      marginBottom: 15,
    },
    section: {
      marginBottom: 20,
    },
    rightSectionTitle: {
      fontSize: settings.fontSize + 2,
      fontWeight: "bold",
      borderBottom: `1px solid ${settings.primaryColor}`,
      paddingBottom: 3,
      marginBottom: 10,
      color: settings.primaryColor,
    },
    profileText: {
      marginBottom: 20,
      textAlign: "justify",
      fontSize: settings.fontSize,
    },
    experienceItem: {
      marginBottom: 15,
    },
    jobTitle: {
      fontSize: settings.fontSize + 1,
      fontWeight: "bold",
      marginBottom: 2,
    },
    companyName: {
      fontSize: settings.fontSize,
      fontWeight: "bold",
      marginBottom: 2,
    },
    dateLocation: {
      fontSize: settings.fontSize - 1,
      color: "#555555",
      marginBottom: 5,
    },
    bullet: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 3,
      marginLeft: 8,
    },
    bulletPoint: {
      width: 10,
      marginRight: 5,
    },
    bulletText: {
      flex: 1,
    },
    references: {
      fontSize: settings.fontSize - 0.5,
      fontStyle: "italic",
      color: "#666",
    },
    languageItem: {
      marginBottom: 3,
    },
  });

  return (
    <Document>
      <Page size={settings.paperSize} style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Profile Image */}
          <Image src="/placeholder.svg" style={styles.profileImage} />

          {/* Contact Information */}
          <View style={styles.section}>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📍</Text>
              <Text>New York, United States</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📧</Text>
              <Link src="mailto:olivia.wilson@gmail.com">
                olivia.wilson@gmail.com
              </Link>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📱</Text>
              <Text>(212) 555-7890</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>🌐</Text>
              <Link src="https://oliviawilson.com">oliviawilson.com</Link>
            </View>
          </View>

          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>education</Text>
            <Text style={styles.companyName}>University of Design</Text>
            <Text>Bachelor of Design</Text>
            <Text style={{ fontSize: settings.fontSize - 1 }}>2015-2019</Text>
          </View>

          {/* Expertise */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>expertise</Text>
            <Text style={styles.skill}>UI Design</Text>
            <Text style={styles.skill}>Web Design</Text>
            <Text style={styles.skill}>UX Research</Text>
            <Text style={styles.skill}>Prototyping</Text>
            <Text style={styles.skill}>Wireframing</Text>
          </View>

          {/* Languages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>languages</Text>
            <Text style={styles.languageItem}>English (Native)</Text>
            <Text style={styles.languageItem}>Spanish (Fluent)</Text>
            <Text style={styles.languageItem}>French (Basic)</Text>
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Name and Title */}
          <View style={styles.section}>
            <Text style={styles.mainName}>OLIVIA WILSON</Text>
            <Text style={styles.mainTitle}>UI/UX Designer</Text>
          </View>

          {/* Profile */}
          <View style={styles.section}>
            <Text style={styles.rightSectionTitle}>Profile</Text>
            <Text style={styles.profileText}>
              Experienced UI/UX designer with over 5 years of creating
              user-centered designs for web and mobile applications. Passionate
              about combining beautiful aesthetics with functional user
              experiences that drive business growth.
            </Text>
          </View>

          {/* Work Experience */}
          <View style={styles.section}>
            <Text style={styles.rightSectionTitle}>Work Experience</Text>

            {/* Job 1 */}
            <View style={styles.experienceItem}>
              <Text style={styles.jobTitle}>Senior UI/UX Designer</Text>
              <Text style={styles.companyName}>Creative Solutions Inc.</Text>
              <Text style={styles.dateLocation}>
                Jan 2021 - Present | New York
              </Text>
              <View>
                <View style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>
                    Led the redesign of the company's flagship product,
                    increasing user engagement by 45%
                  </Text>
                </View>
                <View style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>
                    Collaborated with product and development teams to implement
                    design systems
                  </Text>
                </View>
                <View style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>
                    Conducted user research and usability testing to inform
                    design decisions
                  </Text>
                </View>
              </View>
            </View>

            {/* Job 2 */}
            <View style={styles.experienceItem}>
              <Text style={styles.jobTitle}>UI Designer</Text>
              <Text style={styles.companyName}>Digital Interfaces Co.</Text>
              <Text style={styles.dateLocation}>
                Mar 2019 - Dec 2020 | Boston
              </Text>
              <View>
                <View style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>
                    Created user interfaces for mobile applications across iOS
                    and Android platforms
                  </Text>
                </View>
                <View style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>
                    Developed interactive prototypes and wireframes for client
                    presentations
                  </Text>
                </View>
              </View>
            </View>

            {/* Job 3 */}
            <View style={styles.experienceItem}>
              <Text style={styles.jobTitle}>Junior Designer</Text>
              <Text style={styles.companyName}>WebCraft Studios</Text>
              <Text style={styles.dateLocation}>
                Jun 2018 - Feb 2019 | Remote
              </Text>
              <View>
                <View style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>
                    Assisted senior designers with creating visual assets for
                    client websites
                  </Text>
                </View>
                <View style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>
                    Contributed to the company design system and component
                    library
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* References */}
          <View style={styles.section}>
            <Text style={styles.rightSectionTitle}>References</Text>
            <Text style={styles.references}>Available on request</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumeTemplate;
