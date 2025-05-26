import React, { useEffect } from 'react';
import { commonStyles } from '../utils/styles';
import { unifiedTheme } from '../theme/unifiedTheme';

const TermsOfServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styles = {
    container: {
      ...commonStyles.container,
      paddingTop: '120px',
      paddingBottom: '80px',
      maxWidth: '800px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: unifiedTheme.colors.primary[900],
      marginBottom: '20px',
      textAlign: 'center',
    },
    lastUpdated: {
      textAlign: 'center',
      color: '#718096',
      marginBottom: '40px',
      fontSize: '0.9rem',
    },
    section: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: unifiedTheme.colors.primary[800],
      marginBottom: '15px',
      marginTop: '30px',
    },
    paragraph: {
      lineHeight: '1.8',
      color: '#2D3748',
      marginBottom: '15px',
    },
    list: {
      paddingLeft: '25px',
      marginBottom: '15px',
    },
    listItem: {
      lineHeight: '1.8',
      color: '#2D3748',
      marginBottom: '8px',
    },
  };

  return (
    <div style={commonStyles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>Terms of Service</h1>
        <p style={styles.lastUpdated}>Last Updated: January 2025</p>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <p style={styles.paragraph}>
            By accessing and using the services provided by Le Duc Systems ("Company," "we," "us," or "our"), 
            you accept and agree to be bound by the terms and provision of this agreement. If you do not agree 
            to abide by the above, please do not use this service.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Services Description</h2>
          <p style={styles.paragraph}>
            Le Duc Systems provides custom software development, AI implementation, and technology consulting services. 
            Our services include but are not limited to:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Custom software application development</li>
            <li style={styles.listItem}>Artificial intelligence solution design and implementation</li>
            <li style={styles.listItem}>System integration and automation</li>
            <li style={styles.listItem}>Technology consulting and strategy</li>
            <li style={styles.listItem}>Ongoing support and maintenance services</li>
          </ul>
          <p style={styles.paragraph}>
            The specific services to be provided will be detailed in individual project agreements or statements of work.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Service Limitations</h2>
          <p style={styles.paragraph}>
            While we strive to deliver exceptional results, Le Duc Systems does not guarantee specific outcomes or 
            performance metrics unless explicitly stated in writing in your project agreement. Results may vary based 
            on factors including but not limited to:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Quality and availability of client data</li>
            <li style={styles.listItem}>Client infrastructure and technical environment</li>
            <li style={styles.listItem}>Level of client cooperation and resource availability</li>
            <li style={styles.listItem}>External market conditions and regulatory requirements</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Payment Terms</h2>
          <p style={styles.paragraph}>
            Payment terms will be specified in individual project agreements. Standard terms include:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Initial deposit required before project commencement</li>
            <li style={styles.listItem}>Milestone-based payments as outlined in project agreement</li>
            <li style={styles.listItem}>Net 30 payment terms unless otherwise specified</li>
            <li style={styles.listItem}>Late payments subject to 1.5% monthly interest or maximum allowed by law</li>
          </ul>
          <p style={styles.paragraph}>
            All fees are non-refundable unless otherwise stated in your project agreement.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Refund Policy</h2>
          <p style={styles.paragraph}>
            Refunds are evaluated on a case-by-case basis. We offer a 30-day satisfaction guarantee on certain 
            services as specified in individual agreements. To request a refund:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Submit a written request within the guarantee period</li>
            <li style={styles.listItem}>Provide specific reasons for dissatisfaction</li>
            <li style={styles.listItem}>Allow us opportunity to address concerns</li>
          </ul>
          <p style={styles.paragraph}>
            Refunds, if approved, will be processed within 30 business days.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Intellectual Property Rights</h2>
          <p style={styles.paragraph}>
            Unless otherwise specified in writing:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              Client retains ownership of all pre-existing intellectual property provided to Le Duc Systems
            </li>
            <li style={styles.listItem}>
              Custom software and deliverables created specifically for client become client property upon full payment
            </li>
            <li style={styles.listItem}>
              Le Duc Systems retains rights to general methodologies, frameworks, and non-client-specific knowledge
            </li>
            <li style={styles.listItem}>
              Le Duc Systems may showcase work in portfolio with client permission
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>7. Confidentiality</h2>
          <p style={styles.paragraph}>
            Both parties agree to maintain confidentiality of proprietary information disclosed during the 
            engagement. This includes but is not limited to:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Business strategies and plans</li>
            <li style={styles.listItem}>Technical specifications and source code</li>
            <li style={styles.listItem}>Customer data and personal information</li>
            <li style={styles.listItem}>Financial information</li>
          </ul>
          <p style={styles.paragraph}>
            Confidentiality obligations survive termination of services for a period of five (5) years.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Limitation of Liability</h2>
          <p style={styles.paragraph}>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, LE DUC SYSTEMS SHALL NOT BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
            WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE 
            LOSSES.
          </p>
          <p style={styles.paragraph}>
            In no event shall Le Duc Systems' aggregate liability exceed the total amount paid by client for 
            the specific services giving rise to the claim in the twelve (12) months preceding the claim.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>9. Indemnification</h2>
          <p style={styles.paragraph}>
            Client agrees to indemnify and hold harmless Le Duc Systems from any claims, damages, or expenses 
            arising from:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Client's use of the services or deliverables</li>
            <li style={styles.listItem}>Violation of these terms or applicable laws</li>
            <li style={styles.listItem}>Infringement of third-party rights</li>
            <li style={styles.listItem}>Client-provided content or data</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>10. Termination</h2>
          <p style={styles.paragraph}>
            Either party may terminate services by providing written notice as specified in the project agreement. 
            Upon termination:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Client pays for all work completed to date</li>
            <li style={styles.listItem}>Le Duc Systems provides all completed deliverables</li>
            <li style={styles.listItem}>Both parties return or destroy confidential information</li>
            <li style={styles.listItem}>Post-termination support subject to separate agreement</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>11. Dispute Resolution</h2>
          <p style={styles.paragraph}>
            Any disputes arising from these terms or our services shall be resolved through the following process:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Good faith negotiation between parties</li>
            <li style={styles.listItem}>Mediation with mutually agreed mediator</li>
            <li style={styles.listItem}>Binding arbitration under AAA rules</li>
            <li style={styles.listItem}>Venue: Maricopa County, Arizona</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>12. Governing Law</h2>
          <p style={styles.paragraph}>
            These terms shall be governed by and construed in accordance with the laws of the State of Arizona, 
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>13. Modifications</h2>
          <p style={styles.paragraph}>
            Le Duc Systems reserves the right to modify these terms at any time. Changes will be effective 
            immediately upon posting to our website. Continued use of services constitutes acceptance of 
            modified terms.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>14. Entire Agreement</h2>
          <p style={styles.paragraph}>
            These terms, together with any project agreements and statements of work, constitute the entire 
            agreement between parties and supersede all prior agreements and understandings.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>15. Contact Information</h2>
          <p style={styles.paragraph}>
            For questions about these Terms of Service, please contact us at:
          </p>
          <p style={styles.paragraph}>
            Le Duc Systems<br />
            Email: contact@leducsystems.com<br />
            Website: www.leducsystems.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;