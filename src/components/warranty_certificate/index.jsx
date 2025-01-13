import React, { forwardRef } from 'react';
import { customDateFormatting } from '../../utils/date/customDateFormatting';

const WarrantyCertificate = forwardRef(({
    companyName,
    durationInYears,
    dateOfCommissioning,
    projectName,
    panels,
}, ref) => {

    return (
        <div ref={ref} id="element-to-print">
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', width: '100%', position: 'relative', gap: "1rem" }}>

                <div>
                    <img src="/CertificatePageOneHeader.png" alt="Certificate Header" style={{ height: '17rem', width: '100%' }} />

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '0.5rem', padding: '0 2rem', gap: '1rem' }}>
                        <img src="/BrandCertificatePage2Logo.png" alt="Brand Logo" style={{ height: '8rem', width: '20rem' }} />
                        <div style={{ marginRight: '2.5%' }}>
                            <p style={{ fontSize: '1.43rem', fontWeight: 500, letterSpacing: '0.141rem', marginBottom: '0.5rem', lineHeight: 1 }}>
                                THIS IS TO CERTIFY THAT
                            </p>
                            <p style={{ fontSize: '3.75rem', fontWeight: 500, letterSpacing: '0.046rem', lineHeight: 1, marginBottom: '2rem' }}>
                                {companyName || ""}
                            </p>
                            <p style={{ fontSize: '1.31rem', letterSpacing: '0.012rem', lineHeight: 1.25 }}>
                                We hereby certify the warranty for the below supplied Products <span style={{ fontWeight: 600 }}>{projectName || ""}</span> for a
                                period of <span style={{ fontWeight: 600, textDecoration: 'underline' }}>{durationInYears || 0}</span> from the date of commissioning : <span style={{ fontWeight: 600 }}>{customDateFormatting({ date: dateOfCommissioning, formatString: "dd/MM/yyyy" })}</span>
                            </p>
                            <div>
                                {panels && panels.length > 0 && panels.map((panel, index) => (
                                    <p key={panel.id} style={{ fontSize: '1.31rem', letterSpacing: '0.012rem', lineHeight: 1.25 }}>
                                        {`${index + 1}. ${panel}`}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div style={{ bottom: 0, display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0', marginBottom: '0.5rem', position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                        <p style={{ fontSize: '1.125rem', fontWeight: 400 }}>AAA/CERTW/REF/002</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', padding: "5% 10%" }}>
                        <hr style={{ backgroundColor: '#000', height: '2px', width: '100%' }} />
                        <div style={{ paddingRight: '7rem' }}>
                            <p style={{ fontSize: '1.43rem', fontWeight: 650, letterSpacing: '-0.075rem', lineHeight: 1.5 }}>
                                Afsar Ahmed
                            </p>
                            <p style={{ fontSize: '1.25rem', fontWeight: 400, letterSpacing: '0.003rem', lineHeight: 1.25 }}>
                                Managing Director
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="html2pdf__page-break"></div>

            <div>
                <img src="/certificate_page_2.png" style={{ height: '100%', width: "100%" }} />
            </div>

            {/* <div style={{ display: 'flex', position: "relative", flexDirection: 'column', backgroundColor: '#fff', maxHeight: '90vh', minHeight: '90vh', width: '100%', }}>
                <img src="/CertificateHeader.png" alt="Certificate Header" style={{ width: '100%', height: "16rem" }} />
                <div style={{ alignSelf: 'center', width: '84%', marginTop: '0.5rem' }}>
                    <p style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        fontFamily: 'Montserrat, sans-serif',
                        color: '#000',
                        lineHeight: '1.45'
                    }}>
                        We agree to repair or replace, to the satisfaction of the Owner, any work found to be defective in
                        workmanship, equipment, or materials within the specified period, excluding normal wear and
                        tear as well as damage caused by unusual abuse or neglect. This also includes any additional work
                        that may be damaged or displaced during the repair or replacement process.

                        <br />
                        <br />
                        If we fail to fulfill these obligations within a reasonable timeframe after receiving written notice,
                        we collectively and individually authorize the Owner to proceed with the necessary repairs at our
                        expense. We agree to cover all associated costs and damages immediately upon demand.
                        Furthermore, we commit to thoroughly testing the entire installation upon completion to ensure
                        that all units are functioning satisfactorily.
                    </p>
                </div>
                <div style={{ display: 'flex', width: '100%', alignItems: "center", justifyContent: 'center', marginTop: '2rem' }}>
                    <img src="/BrandCertificatePage2Logo.png" alt="Brand Logo" style={{ height: '8rem', width: '16rem' }} />
                </div>

                <div style={{ position: "absolute", bottom: 0, left: 0 }}>
                    <p style={{ fontSize: '1.125rem', fontWeight: 400 }}>AAA/CERTW/REF/002</p>
                </div>

            </div> */}
        </div>
    );
});

export default WarrantyCertificate;