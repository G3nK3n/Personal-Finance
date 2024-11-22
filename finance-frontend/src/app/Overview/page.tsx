import { Box, Container, Stack } from "@mui/material";

import Balance_Overview from "./Balance_Overview/page";

import Pots_Overview from "./Pots_Overview/page";
import Transaction_Overview from "./Transaction_Overview/page";
import Budget_Overview from "./Budget_Overview/page";
import Recurring_Bills_Overview from "./Recurring_Bills_Overview/page";

export default function Overview() {
  return (
    <Box sx={{}}>
      <Container maxWidth="xl">
        <Balance_Overview />
        <Box>
    
            <Stack direction={"row"}>

              <Stack direction={"column"}>

                <Box sx={{backgroundColor: 'white', display: 'inline-block', width: '608px', padding: '30px', mr: '158px', borderRadius: '20px', marginTop: '50px'}}>
                  {/* Temporary data until backend from database */}
                  <Pots_Overview />
                </Box>

                <Box sx={{backgroundColor: 'white', display: 'inline-block', width: '608px', padding: '30px', mr: '158px', borderRadius: '20px', marginTop: '50px', mb: '40px'}}>
                  {/* Temporary data until backend from database */}
                  <Transaction_Overview />
                </Box>

              </Stack>

              <Stack direction={"column"}>

                <Box sx={{backgroundColor: 'white', display: 'inline-block', width: '463px', padding: '30px', ml: '100px', borderRadius: '20px', marginTop: '50px'}}>
                  {/* Temporary data until backend from database */}
                  <Budget_Overview />
                </Box>

                <Box sx={{backgroundColor: 'white', display: 'inline-block', width: '463px', padding: '30px', ml: '100px', borderRadius: '20px', marginTop: '50px'}}>
                  {/* Temporary data until backend from database */}
                  <Recurring_Bills_Overview />
                </Box>

              </Stack>

            </Stack>
        </Box>
      </Container>
    </Box>
  );
}
