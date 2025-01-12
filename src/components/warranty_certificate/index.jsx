import React, { forwardRef, useRef } from 'react';
import { Divider, Stack, Typography, Button } from '@mui/material';
import html2pdf from 'html2pdf.js';
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
            {/* Page 1 */}
            <Stack sx={{ gap: "0rem", backgroundColor: "#fff", maxHeight: "97vh", minHeight: "97vh", width: "100%", position: "relative" }}>
                {/* Page 1 Content */}
                <img src="/CertificatePageOneHeader.png" alt="Certificate Header" style={{ height: "40vh" }} />

                <Stack direction="row" alignItems="center" sx={{ mt: "0.5rem", padding: "0rem 2rem", gap: "1rem" }}>
                    <img src="/BrandCertificatePage2Logo.png" alt="Brand Logo" style={{ height: "10rem", width: '24rem' }} />
                    <Stack sx={{ gap: "0.25rem", mr: "2.5%" }}>
                        <Typography sx={{ fontSize: '1.43rem', fontWeight: 500, letterSpacing: "0.141rem", mb: "0.25rem", lineHeight: 1 }}>
                            THIS IS TO CERTIFY THAT
                        </Typography>
                        <Typography sx={{ fontSize: '4rem', fontWeight: 500, letterSpacing: "0.046rem", lineHeight: 1, mb: "1rem" }}>
                            {companyName || ""}
                        </Typography>
                        <Typography sx={{ fontSize: "1.31rem", letterSpacing: "0.012rem", lineHeight: 1.25 }}>
                            We hereby certify the warranty for the below supplied Products <span style={{ fontWeight: 600 }}>{projectName || ""}</span> for a
                            period of <span style={{ fontWeight: 600, textDecoration: "underline" }}>{durationInYears || 0}</span> from the date of commissioning : <span style={{ fontWeight: 600 }}>{customDateFormatting({ date: dateOfCommissioning, formatString: "dd/MM/yyyy" })}</span>
                        </Typography>
                        <Stack sx={{ gap: "" }}>
                            {panels && panels.length > 0 && panels.map((panel, index) => (
                                <Typography key={panel.id} sx={{ fontSize: "1.31rem", letterSpacing: "0.012rem", lineHeight: 1.25 }}>
                                    {`${index + 1}. ${panel}`}
                                </Typography>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>

                <Stack sx={{ position: "absolute", bottom: 0, flex: 1, width: "100%" }}>
                    <Stack alignSelf="flex-end" sx={{ gap: "0.5rem", pr: '10%', mt: "4rem", mb: "0.5rem" }}>
                        <Divider sx={{ backgroundColor: "#000", height: "1.25px" }} />
                        <Stack sx={{ pr: "7rem" }}>
                            <Typography sx={{ fontSize: "1.43rem", fontWeight: 650, letterSpacing: "-0.075rem", lineHeight: 1.5 }}>
                                Afsar Ahmed
                            </Typography>
                            <Typography sx={{ fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.003rem", lineHeight: 1.25 }}>
                                Managing Director
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack alignSelf="flex-start">
                        <Typography sx={{ fontSize: '1.125rem', fontWeight: 400 }}>AAA/CERTW/REF/002</Typography>
                    </Stack>
                </Stack>
            </Stack>

            {/* Page Break */}
            <div className="html2pdf__page-break"></div>

            {/* Page 2 */}
            <Stack sx={{ gap: "0rem", backgroundColor: "#fff", width: "100%", maxHeight: "97vh", minHeight: "97vh", position: "relative" }}>
                {/* Page 2 Content */}
                <img src="/CertificateHeader.png" alt="Certificate Header" />
                <Stack alignSelf="center" sx={{ width: "84%", mt: "0.5rem" }}>
                    <Typography sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        fontFamily: "Montserrat",
                        color: "#000",
                        lineHeight: "1.45"
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
                    </Typography>
                </Stack>

                <Stack sx={{ position: "absolute", bottom: 0, flex: 1, width: "100%" }}>
                    <Stack alignSelf="center" sx={{ mt: "0rem" }}>
                        <img src="/BrandCertificatePage2Logo.png" alt="Brand Logo" style={{ height: "10rem", width: '24rem' }} />
                    </Stack>
                    <Stack sx={{}}>
                        <Typography sx={{ fontSize: '1.125rem', fontWeight: 400 }}>AAA/CERTW/REF/002</Typography>
                    </Stack>
                </Stack>
            </Stack>

        </div>
    );
});

export default WarrantyCertificate;
