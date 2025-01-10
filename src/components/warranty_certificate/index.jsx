import React from 'react';
import { Stack, Typography } from '@mui/material';
import BrandLogo from '../../svgs/BrandLogo';

const WarrantyCertificate = () => {
    return (
        <Stack sx={{ gap: "2rem", backgroundColor: "#fff", width: "100%" }}>
            <img src="/CertificateHeader.png" alt="Certificate Header" />
            <Stack alignSelf="center" sx={{ width: "75%" }}>
                <Typography sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.125rem",
                    fontFamily: "Montserrat",
                    color: "#000"
                }}>
                    We agree to repair or replace, to the satisfaction of the Owner, any work found to be defective in
                    workmanship, equipment, or materials within the specified period, excluding normal wear and
                    tear as well as damage caused by unusual abuse or neglect. This also includes any additional work
                    that may be damaged or displaced during the repair or replacement process.

                    <br />If we fail to fulfill these obligations within a reasonable timeframe after receiving written notice,
                    we collectively and individually authorize the Owner to proceed with the necessary repairs at our
                    expense. We agree to cover all associated costs and damages immediately upon demand.
                    Furthermore, we commit to thoroughly testing the entire installation upon completion to ensure
                    that all units are functioning satisfactorily.
                </Typography>
            </Stack>

            <Stack>
                <Stack alignSelf="center" sx={{ mt: "0.5rem" }}>
                    <img src="/BrandCertificatePage2Logo.png" alt="Brand Logo" style={{ height: "10rem", width: '24rem' }} />
                </Stack>
                <Typography sx={{ fontSize: '1.125rem', fontWeight: 400 }}>AAA/CERTW/REF/002</Typography>
            </Stack>
        </Stack >
    );
}

export default WarrantyCertificate;