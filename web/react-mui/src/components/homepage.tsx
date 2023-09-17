import * as React from 'react';
import ResponsiveAppBar from './AppBar';
import StickyHeadTable from './datatable';
import { Container } from '@mui/system';
export default function HomePage() {
    return <div>
        <ResponsiveAppBar />
        <Container maxWidth='xl'
            sx={{
                marginTop: 5
            }}>
            <StickyHeadTable />
        </Container>

    </div>;
}
