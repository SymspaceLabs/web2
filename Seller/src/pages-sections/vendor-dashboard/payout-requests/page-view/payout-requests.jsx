"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; // GLOBAL CUSTOM COMPONENTS

import { H3 } from "../../../../components/Typography";
import Scrollbar from "../../../../components/scrollbar";
import { TableHeader, TablePagination } from "../../../../components/data-table"; // GLOBAL CUSTOM HOOK

import useMuiTable from "../../../../hooks/useMuiTable"; // Local CUSTOM COMPONENT

import RequestRow from "../request-row"; // TABLE HEAD COLUMN DATA

import { tableHeading } from "../table-heading"; // DATA TYPES

// =============================================================================
const PayoutRequestsPageView = ({
  requests
}) => {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: requests,
    defaultSort: "no"
  });
  return <Box py={4}>
      <H3 mb={2}>Payout Requests</H3>

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 1100
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={requests.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((request, index) => <RequestRow request={request} key={index} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(requests.length / rowsPerPage)} />
        </Stack>
      </Card>
    </Box>;
};

export default PayoutRequestsPageView;